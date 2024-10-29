import { Admin } from './admin';

export interface Suggestion {
  id: number;
  titleSuggestion: string;
  description: string;
  admin: Admin | null;
  estado: string;
  comentarioAdmin: string | null;
}
