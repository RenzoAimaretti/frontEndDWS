import { Movie } from './movie';
import { User } from './user';
export interface List {
  id: number;
  nameList: string;
  descriptionList: string;
  contents: Movie[];
  owner: User;
}
