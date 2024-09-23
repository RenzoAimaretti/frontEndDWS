import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Review } from '../../interface/review';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input() idContent: number = 0;
  @Input() nameContent: string = '';
  rating: number = 1; // van de 1 a 5 sin un paso del 0.5 por ser entero.
  description: string = ''; // descripcion de la reseña, puede ser vacia.
  reviewsToDisplay: Review[] = []; // array de reseñas a mostrar.
  comments: string[] = []; // Array para comentarios independientes
  currentUserId?: number;
  // Datos para la edicion de una review
  editingReviewIndex: number | null = null; // Índice de la reseña que se está editando
  editingRating: number = 1;  // Rating que se está editando
  editingDescription: string = '';  // Descripción que se está editando

  constructor(private reviewService: ReviewService, private authService: AuthService) {

  }
  ngOnInit(): void {
    this.getReviews();
    this.rating = 1
    if (this.authService.currentUserLoginOn.value) {
      this.currentUserId = this.authService.currentUserId.value;
    }
  }

  sendReview() {
    if (this.authService.currentUserLoginOn.value) {

      let reviewToPost = {
        nameContent: this.nameContent,
        rating: this.rating,
        description: this.description
      }

      this.reviewService.postReview(this.idContent, reviewToPost).subscribe(
        result => {
          console.log(result)
          //obtener la lista de reseñas actualizada
          this.getReviews();
          // Limpiar los campos del formulario
          this.rating = 1;
          this.description = '';
        }
      )

    } else {
      window.alert("Tenes que estar logueado para poder reseñar")
    }
  };

  deleteReview() {
    this.reviewService.deleteReview(this.idContent).subscribe(
      () => this.getReviews()
    )
  };

  getReviews() {
    console.log('idContent:', this.idContent)
    this.reviewService.getReviews(this.idContent).pipe(
    ).subscribe(
      result => { this.reviewsToDisplay = result.reverse() }
    );
  };


  // Método para habilitar el modo de edición de una reseña
  startEditing(index: number) {
    this.editingReviewIndex = index;
    this.editingRating = this.reviewsToDisplay[index].rating;
    this.editingDescription = this.reviewsToDisplay[index].description;
  }

  // Método para cancelar la edición
  cancelEdit() {
    this.editingReviewIndex = null;
  }

  editReview() {
    if (this.editingReviewIndex !== null) {
      const reviewToEdit = {
        rating: this.editingRating,
        description: this.editingDescription
      };
      this.reviewService.editReview(this.idContent, reviewToEdit).subscribe(
        result => {
          console.log(result)
          //obtener la lista de reseñas actualizada
          this.getReviews();
          // Limpiar los campos del formulario
          this.editingRating = 1;
          this.editingDescription = '';
          this.editingReviewIndex = null;
        }
      )
    }
  }

  // Método para setear el rating mientras se edita
  setEditingRating(rating: number) {
    this.editingRating = rating;
  }


  setRating(stars: number) {
    this.rating = stars;
  }

  sendComment(idReviewOwner: number, index: number) {
    if (this.authService.currentUserLoginOn.value && this.idContent) {
      let commentToPost = {
        comment: this.comments[index] // Obtener el comentario específico del array
      };
      this.reviewService.postComment(this.idContent, idReviewOwner, commentToPost).subscribe(
        () => {
          this.getReviews();
          this.comments[index] = ''; // Limpiar el comentario después de enviarlo
        }
      );
    } else {
      window.alert("Tenes que estar logueado para poder comentar");
    }
  }


  //METODOS PARA COMENTAR CUANDO ESTEN DISPONIBLES

};

