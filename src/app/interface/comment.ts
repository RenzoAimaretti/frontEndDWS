import { Review } from "./review";
import { User } from "./user";

export interface Comment{
    commentOwner: User;
    comment: string;
    commentReview: Review;
}