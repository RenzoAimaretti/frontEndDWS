import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { List } from '../interface/list';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private searchUrl = 'http://localhost:3000/api/lists/search?nameList=';
  private baseUrl = 'http://localhost:3000/api/lists/'

  constructor(private http: HttpClient) { }


  searchLists(query: string): Observable<List[]> {
    return this.http.get<{ message: string, data: List[] }>(`${this.searchUrl}${query}`)
      .pipe(
        map(result => result.data),
        catchError(this.handleError<List[]>('searchLists', []))
      );
  }

  getList(id:number): Observable<List>{
    return this.http.get<{ message:String, data:List}>(`${this.baseUrl + id}`)
    .pipe (map((result: any) => result.data),
    catchError(this.handleError<List>('getList'))
    )

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
