import { Component, Input } from '@angular/core';
import { Review } from '../../interface/review';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-comment-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './review-comment-form.component.html',
  styleUrl: './review-comment-form.component.css'
})
export class ReviewCommentFormComponent {
  @Input() idContent?: number;
  @Input() review?:Review
  comment: string='';
  constructor(private reviewService:ReviewService, private authService:AuthService) { }

  sendComment(idReviewOwner:number){
    if(this.authService.currentUserLoginOn.value && this.idContent){
    let commentToPost = {
      comment: this.comment
    }
    console.log(commentToPost)
    this.reviewService.postComment(this.idContent,idReviewOwner,commentToPost)
    }else{
      window.alert("Tenes que estar logueado para poder comentar")
    }
  }
}
