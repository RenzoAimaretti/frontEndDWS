import { Movie } from './movie.js';
import { User } from './user.js';
import { Comment } from './comment.js';
export interface Review {
  content: Movie;
  reviewOwner: User;
  description: string;
  rating: number;
  comments: Comment[];
}
