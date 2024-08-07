import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class UserService {
    private usersUrl = 'http://localhost:3000/api/users/';
    httpOptions = {
        Headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
      return this.http.get<{message: string, data: []}>(this.usersUrl)
        .pipe(
          map((result: any) => result.data),
          catchError(this.handleError<User[]>('getUsers', []))
        );    
    }


    getUser(id: number): Observable<User> {
      return this.http.get<{message: string, data: User}>(this.usersUrl + id)
      .pipe(
        map((result: any) => result.data),
        catchError(this.handleError<User>('getUser'))
      )
    }
    
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
    
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);
    
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }




}