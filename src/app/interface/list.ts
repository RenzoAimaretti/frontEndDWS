import { Movie } from "./movie.js";

export interface List {
    id: number;
    nameList: string;
    descriptionList: string;
    contents: Movie[]; 
    owner: number
  }
  