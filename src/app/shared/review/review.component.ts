import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Review } from '../../interface/review';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input() idContent: number=0;
  @Input() nameContent: string='';
  rating: number=1; // van de 1 a 5 sin un paso del 0.5 por ser entero.
  description: string=''; // descripcion de la reseña, puede ser vacia.
  reviewsToDisplay: Review[]=[]; // array de reseñas a mostrar.
  comments: string[] = []; // Array para comentarios independientes
  currentUserId?:number;
  constructor(private reviewService:ReviewService, private authService:AuthService) { 
    
  }
  ngOnInit(): void {
    this.getReviews ();
    this.rating=1
    if (this.authService.currentUserLoginOn.value){
      this.currentUserId=this.authService.currentUserId.value;
      console.log(this.currentUserId)
    }
  }

  sendReview(){
    if(this.authService.currentUserLoginOn.value){

    let reviewToPost = {
      nameContent: this.nameContent,
      rating: this.rating,
      description: this.description
    }
    
    this.reviewService.postReview(this.idContent,reviewToPost).subscribe(
      result=>{
        console.log(result)
        //obtener la lista de reseñas actualizada
        this.getReviews();
        // Limpiar los campos del formulario
        this.rating = 1;
        this.description = '';
      }
    )
    
  }else{
    window.alert("Tenes que estar logueado para poder reseñar")
  }
  };

  deleteReview(){
    this.reviewService.deleteReview(this.idContent).subscribe(
      ()=>this.getReviews()
    )
  };

  getReviews(){
      console.log('idContent:',this.idContent)
      this.reviewService.getReviews(this.idContent).pipe(
      ).subscribe(
        result=>{this.reviewsToDisplay=result.reverse()}
      );
  };

  setRating(stars: number) {
    this.rating = stars;
    console.log(this.rating);
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

