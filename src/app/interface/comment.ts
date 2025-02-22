import { Review } from './review.js';
import { User } from './user.js';

export interface Comment {
  commentOwner: User;
  comment: string;
  commentReview: Review;
}
