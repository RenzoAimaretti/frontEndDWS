import { Movie } from "./movie";
import { User } from "./user";

export interface Review{
    content: Movie;
    reviewOwner: User;
    description: string;
    rating: number;
    //comments
}