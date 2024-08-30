import { Movie } from "./movie";
import { User } from "./user";
import { Comment } from "./comment";
export interface Review{
    content: Movie;
    reviewOwner: User;
    description: string;
    rating: number;
    comments: Comment[];
}