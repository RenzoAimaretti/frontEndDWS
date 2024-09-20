import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interface/user';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';


@Injectable({providedIn: 'root'})
export class UserService {
    private usersUrl = 'http://localhost:3000/api/users/';
    private searchUrl = 'http://localhost:3000/api/users/search?name=';     
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    constructor(private http: HttpClient,private cookieService:CookieService) {}

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

    updateUser(user: User): Observable<any> {
      return this.http.patch(this.usersUrl + user.id, user)
      .pipe(
        tap(_ => console.log(`updated user id=${user.id}`)),
        catchError(this.handleError<any>('updateUser'))
      )
    }

    delateUser(id: number): Observable<User> {
      console.log(id);
      this.cookieService.deleteAll()
      return this.http.delete<{message: string, data: User}>(this.usersUrl + id).pipe(
        map((result: any) => result.data),
        catchError(this.handleError<User>('deleteUser'))
      )
    }
    
    searchUsers(query: string): Observable<User[]> {
      return this.http.get<{ message: string, data: User[] }>(`${this.searchUrl}${query}`)
          .pipe(
              map(result => result.data),
              catchError(this.handleError<User[]>('searchUsers', []))
          );
    }
    followUser(userToFollowID:number, userFollower:number){
      return this.http.post<{message:string,data:object}>(this.usersUrl + 'follow/' + userFollower+ '/' + userToFollowID, this.httpOptions);
    }

    unfollowUser(userToUnfollowID:number, userFollower:number){
      return this.http.post<{message:string,data:object}>(this.usersUrl + 'unfollow/' + userFollower+ '/' + userToUnfollowID, this.httpOptions);
    }


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
          
          console.error(error); 
    
          
          console.log(`${operation} failed: ${error.message}`);
    
        
          return of(result as T);
        };
      }




}