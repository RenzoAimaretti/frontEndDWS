import { Movie } from "./movie.js";
import { User } from "./user.js";
export interface List {
    id: number;
    nameList: string;
    descriptionList: string;
    contents: Movie[]; 
    owner: User
  }
  