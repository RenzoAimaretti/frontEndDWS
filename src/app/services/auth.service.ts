import { Injectable } from '@angular/core';
import { LoginRequest } from '../interface/loginRequest.js';
import { registerRequest } from '../interface/registerRequest.js';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  catchError,
  Observable,
  throwError,
  BehaviorSubject,
  tap,
  map,
} from 'rxjs';
import { User } from '../interface/user';
import { CookieService } from 'ngx-cookie-service';
import { Admin } from '../interface/admin';
import { environment } from '../../environments/environment.js';
@Injectable({ providedIn: 'root' })
export class AuthService {
  authUrl = `${environment.domainBack}/api/auth/`;
  dashboardUrl = `${environment.domainBack}/api/dashboard/`;
  dashboardAdminUrl = `${environment.domainBack}/api/dashboard/admin`;
  adminUrl = `${environment.domainBack}/api/admin/`;

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<string> = new BehaviorSubject<string>('');
  currentUserId = new BehaviorSubject<number>(-1);

  currentAdminLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentAdminData: BehaviorSubject<string> = new BehaviorSubject<string>('');
  currentAdminId = new BehaviorSubject<number>(-1);
  constructor(private http: HttpClient, private cookieService: CookieService) {
    //user
    const accessToken = this.cookieService.get('access_token');
    this.currentUserLoginOn = new BehaviorSubject<boolean>(!!accessToken);
    this.currentUserData = new BehaviorSubject<string>(accessToken || '');
    if (this.currentUserLoginOn.value) {
      this.getIdFromToken();
    }
    //admin
    const accessAdminToken = this.cookieService.get('access_admin_token');
    this.currentAdminLoginOn = new BehaviorSubject<boolean>(!!accessAdminToken);
    this.currentAdminData = new BehaviorSubject<string>(accessAdminToken || '');
    if (this.currentAdminLoginOn.value) {
      this.getAdminIdFromToken();
    }
  }

  register(credentials: registerRequest) {
    return this.http
      .post(`${this.authUrl}register`, credentials)
      .pipe(catchError(this.handleError));
  }

  login(credentials: LoginRequest): Observable<User> {
    //limpiamos las cookies de admin para evitar que esten activas a la vez
    this.cookieService.delete('access_admin_token');
    return this.http.post<any>(`${this.authUrl}login`, credentials).pipe(
      tap((userData) => {
        const { data, token } = userData;
        this.currentUserId.next(data.id);
        this.cookieService.set('access_token', token);
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
        this.getIdFromToken();
        console.log(this.currentUserId.value);
      }),
      catchError(this.handleError)
    );
  }

  loginAdmin(credentials: LoginRequest): Observable<Admin> {
    //limpiamos las cookies de usuario para evitar que esten activas a la vez
    this.cookieService.delete('access_token');
    return this.http.post<any>(`${this.authUrl}login/admin`, credentials).pipe(
      tap((userData) => {
        const { data, token } = userData;
        this.currentAdminId.next(data.id);
        this.cookieService.set('access_admin_token', token);
        this.currentAdminData.next(userData);
        this.currentAdminLoginOn.next(true);
        this.getAdminIdFromToken();
        console.log(this.currentAdminId.value);
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.cookieService.deleteAll();
    this.http.post<any>(`${this.authUrl}logout`, {});
  }

  currentUser(): Observable<number> {
    return this.currentUserId.asObservable();
  }
  currentAdmin(): Observable<number> {
    return this.currentAdminId.asObservable();
  }

  getIdFromToken(): void {
    this.http
      .get<any>(this.dashboardUrl)
      .pipe(
        map((result: any) => result), // Mapear solo el ID del resultado
        catchError(this.handleError)
      )
      .subscribe((userId: number) => {
        this.currentUserId.next(userId); // Guardar el ID en el BehaviorSubject
      });
  }

  getAdminIdFromToken(): void {
    this.http
      .get<any>(this.dashboardAdminUrl)
      .pipe(
        map((result: any) => result), // Mapear solo el ID del resultado
        catchError(this.handleError)
      )
      .subscribe((adminId: number) => {
        this.currentAdminId.next(adminId); // Guardar el ID en el BehaviorSubject
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Ocurrio un error :', error.error);
    } else {
      console.error(
        `El backend devolvio codigo ${error.status}, ` +
          `el body era: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Algo malo paso; por favor, intente de nuevo mas tarde.')
    );
  }

  getUserData(): Observable<string> {
    return this.currentUserData.asObservable();
  }

  getAdminData(): Observable<string> {
    return this.currentAdminData.asObservable();
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  isAdminLoggedIn(): Observable<boolean> {
    return this.currentAdminLoginOn.asObservable();
  }

  getAdmin(): Observable<Admin> {
    return this.http.get<Admin>(
      `${this.adminUrl}/${this.currentAdminId.value}`
    );
  }

  clearToken(): Promise<any> {
    this.cookieService.deleteAll();
    return Promise.resolve('clear');
  }
}
