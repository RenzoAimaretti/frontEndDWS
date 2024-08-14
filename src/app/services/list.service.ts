import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { List } from '../interface/list';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private baseUrl = 'http://localhost:3000/api/lists/search?nameList=';

  constructor(private http: HttpClient) { }


  searchLists(query: string): Observable<List[]> {
    return this.http.get<{ message: string, data: List[] }>(`${this.baseUrl}${query}`)
      .pipe(
        map(result => result.data),
        catchError(this.handleError<List[]>('searchLists', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
