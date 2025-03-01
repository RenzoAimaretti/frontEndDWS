import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.js';

@Injectable({
  providedIn: 'root',
})
export class SuggestionsService {
  private suggestionUrl = `${environment.domainBack}/api/suggestions/`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getSuggestions(): Observable<any> {
    return this.http.get<any>(this.suggestionUrl).pipe(
      map((result: any) => result.data),
      catchError(this.handleError)
    );
  }

  getOneSuggestion(idSuggestion: number): Observable<any> {
    return this.http.get<any>(`${this.suggestionUrl}${idSuggestion}`).pipe(
      map((result: any) => result.data),
      catchError(this.handleError)
    );
  }

  postSuggestion(suggestionToPost: {
    titleSuggestion: string;
    description: string;
  }): Observable<any> {
    return this.http
      .post<any>(this.suggestionUrl, suggestionToPost, this.httpOptions)
      .pipe(
        map((result: any) => result.data),
        catchError(this.handleError)
      );
  }

  deleteSuggestion(idSuggestion: number): Observable<any> {
    return this.http
      .delete(`${this.suggestionUrl}${idSuggestion}`, this.httpOptions)
      .pipe(
        map((result: any) => result.data),
        catchError(this.handleError)
      );
  }

  reviseSuggestion(
    idSuggestion: number,
    suggestionToEdit: { admin: Number; comentarioAdmin: string; estado: string }
  ): Observable<any> {
    return this.http
      .put(
        `${this.suggestionUrl}${idSuggestion}`,
        suggestionToEdit,
        this.httpOptions
      )
      .pipe(
        map((result: any) => result.data),
        catchError(this.handleError)
      );
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
}
