import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Review } from '../../interface/review';
import { ReviewService } from '../../services/review.service';
import { TmdbService } from '../../services/tmdb-service.service';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs';
import { ReviewCommentFormComponent } from '../review-comment-form/review-comment-form.component';
@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule,FormsModule,ReviewCommentFormComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input() idContent: number=0;
  @Input() nameContent: string='';
  rating: number=1; // van de 1 a 5 sin un paso del 0.5 por ser entero.
  description: string=''; // descripcion de la reseña, puede ser vacia.
  reviewsToDisplay: Review[]=[]; // array de reseñas a mostrar.
  comment: string=''; // comentario a realizar.
  constructor(private reviewService:ReviewService, private authService:AuthService) { 
    
  }
  ngOnInit(): void {
    this.getReviews ();
    this.rating=1
  }

  sendReview(){
    if(this.authService.currentUserLoginOn.value){

    let reviewToPost = {
      nameContent: this.nameContent,
      rating: this.rating,
      description: this.description
    }
    
    this.reviewService.postReview(this.idContent,reviewToPost).subscribe(
      result=>console.log(result)
    )
    this.getReviews();
  }else{
    window.alert("Tenes que estar logueado para poder comentar")
  }
  };

  deleteReview(){
    this.reviewService.deleteReview(this.idContent).subscribe(
      result=>console.log(result)
    )
  };

  getReviews(){
      console.log('idContent:',this.idContent)
      this.reviewService.getReviews(this.idContent).pipe(
      ).subscribe(
        result=>this.reviewsToDisplay=result
      );
  };

  setRating(stars: number) {
    this.rating = stars;
    console.log(this.rating);
  }

  

  //METODOS PARA COMENTAR CUANDO ESTEN DISPONIBLES
  
};

