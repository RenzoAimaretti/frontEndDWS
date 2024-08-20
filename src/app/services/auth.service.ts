import { Injectable } from '@angular/core';
import { LoginRequest } from '../interface/loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable,throwError, BehaviorSubject, tap, map } from 'rxjs';
import { User } from '../interface/user';
import { CookieService } from 'ngx-cookie-service';
@Injectable({providedIn: 'root'})
export class AuthService {
  authUrl = 'http://localhost:3000/api/auth/';

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<string> = new BehaviorSubject<string>('')
  currentUserId= new BehaviorSubject<string>('')
  constructor(private http:HttpClient,private cookieService: CookieService) { 
    const accessToken = this.cookieService.get('access_token');
    this.currentUserLoginOn = new BehaviorSubject<boolean>(!!accessToken);
    this.currentUserData= new BehaviorSubject<string>(accessToken||'');
    
  }

  login(credentials: LoginRequest): Observable<User> {
    return this.http.post<any>(`${this.authUrl}login`, credentials).pipe(
      tap((userData) => {
        const {data,token}=userData
        this.currentUserId.next(data.id)
        this.cookieService.set('access_token', token);
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    );
  }
  
  logout(): Observable<void> {
    return this.http.post<any>(`${this.authUrl}logout`, {}).pipe(
      tap(() => {
        this.cookieService.delete('access_token');
        this.currentUserData.next('');
        this.currentUserLoginOn.next(false);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Ocurrio un error :', error.error);
    } else {
      console.error(
        `El backend devolvio codigo ${error.status}, ` +
        `el body era: ${error.error}`);
    }
    return throwError(() => new Error('Algo malo paso; por favor, intente de nuevo mas tarde.'));
  }

  getUserData(): Observable<string> {
    return this.currentUserData.asObservable();
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }
}
