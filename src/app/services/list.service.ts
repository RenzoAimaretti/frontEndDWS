import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { List } from '../interface/list';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service.js';
import { Movie } from '../interface/movie.js';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private searchUrl = 'http://localhost:3000/api/lists/search?nameList=';
  private baseUrl = 'http://localhost:3000/api/lists/'

  constructor(private http: HttpClient, private authService:AuthService) { }


  searchLists(query: string): Observable<List[]> {
    return this.http.get<{ message: string, data: List[] }>(`${this.searchUrl}${query}`)
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

  getList(id:number): Observable<List>{
    return this.http.get<{ message:String, data:List}>(`${this.baseUrl + id}`)
    .pipe (map((result: any) => result.data),
    catchError(this.handleError<List>('getList'))
    )
  };

  addContent(idContent: number, idList: number, nameContent: string): Observable<{ message: string, data?: List }> {
    return this.http.put<{ message: string, data: List }>(`${this.baseUrl + idContent + '/' + idList + '/addContent'}`, { idContent, nameContent })
      .pipe(
        map((result: any) => {
          return { message: result.message, data: result.data };
        }),
        catchError(this.handleError<{ message: string, data?: List }>('addContent'))
      );
  }
  
  
  createList(list: List): Observable<List> {
    return this.http.post<{message: string, data:List}>(`${this.baseUrl}`, list).pipe(map((result: any) => result.data),
    catchError(this.handleError<List>('createList')))
  }

}