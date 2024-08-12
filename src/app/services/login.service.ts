import { Injectable } from '@angular/core';
import { LoginRequest } from '../interface/loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable,throwError, BehaviorSubject, tap } from 'rxjs';
import { User } from '../interface/user';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({id:0,
    name:'',
    email:'',
    rangoCinefilo:{
      id:0,
      nameRango:'',
      descriptionRango:''},
    subscription:{
      id:0,
      name:'',
      cantidadSem:0}});
      
  constructor(private http:HttpClient) { }

  login(credentials:LoginRequest): Observable<User>{ {
    return this.http.get<User>('././assets/data.json').pipe(
      tap((userData)=>{
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    );
    }
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

  getUserData(): Observable<User> {
    return this.currentUserData.asObservable();
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }
}
