import { Injectable } from '@angular/core';
import { Review } from '../interface/review.js';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service.js';
import { environment } from '../../environments/environment.js';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
  duration: 4000,
  position: {
    x: 'center',
    y: 'top',
  },
  ripple: true,
  dismissible: true,
  types: [
    {
      type: 'success',
      background: 'linear-gradient(135deg, #72c6ef 0%, #004e92 100%)',
      icon: {
        className: 'notyf__icon--custom',
        tagName: 'span',
      },
      className: 'custom-success',
    },
  ],
});
@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private ownerId?: number;
  private idCommentOwner?: number;
  private reviewUrl = `${environment.domainBack}/api/review/`;
  private commentUrl = `${environment.domainBack}/api/review/comment/`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient, private authService: AuthService) {}

  postReview(
    idContent: number,
    reviewToPost: { nameContent: string; rating: number; description: string }
  ): Observable<any> {
    this.authService.getIdFromToken();
    this.authService.currentUser().subscribe({
      next: (response) => {
        this.ownerId = response;
      },
    });
    return this.http
      .post<Review>(
        `${this.reviewUrl}${idContent}/${this.ownerId}`,
        reviewToPost,
        this.httpOptions
      )
      .pipe(
        map((result: any) => result),
        tap((result) => {
          if (result.message === 'Toxicity detected') {
            window.alert(
              'Tu reseña contiene contenido toxico, por favor modificala'
            );
          }
          console.log(result), console.log(result);
          if (result.rangoChanged) {
            notyf.success(
              `🎉 ¡Felicidades! Obtuviste el rango: ${result.newRango}`
            );
          }
        }),
        catchError(this.handleError)
      );
  }

  deleteReview(idContent: number): Observable<any> {
    const ownerId = this.authService.currentUserId.value;
    return this.http
      .delete(`${this.reviewUrl}${idContent}/${ownerId}`, this.httpOptions)
      .pipe(
        map((result: any) => result.data),
        tap((result) => console.log(result)),
        catchError(this.handleError)
      );
  }

  getReviews(idContent: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.reviewUrl}${idContent}`).pipe(
      map((result: any) => result.data),
      //tap(result=>console.log(result)),
      catchError(this.handleError)
    );
  }

  editReview(
    idContent: number,
    reviewToEdit: { rating: number; description: string }
  ): Observable<any> {
    const ownerId = this.authService.currentUserId.value;
    return this.http
      .put(
        `${this.reviewUrl}${idContent}/${ownerId}`,
        reviewToEdit,
        this.httpOptions
      )
      .pipe(
        map((result: any) => result),
        tap((result) => {
          if (result.message === 'Toxicity detected') {
            window.alert(
              'Lo que intentas modificar es toxico, por favor modificalo'
            );
          }
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }

  postComment(
    idContent: number,
    idReviewOwner: number,
    commentToPost: { comment: string }
  ): Observable<any> {
    this.authService.getIdFromToken();
    return this.authService.currentUser().pipe(
      tap((response) => {
        if (response) {
          const idCommentOwner = response;

          this.http
            .post(
              `${this.commentUrl}${idContent}/${idReviewOwner}/${idCommentOwner}`,
              commentToPost,
              this.httpOptions
            )
            .pipe(
              tap((result) => console.log('Comentario enviado:', result)),
              catchError(this.handleError)
            )
            .subscribe({
              next: (result) => console.log('Respuesta del servidor:', result),
              error: (error) =>
                console.error('Error al enviar comentario:', error),
            });
        } else {
          window.alert('Debes estar logueado para comentar');
        }
      }),
      catchError(this.handleError)
    );
  }

  deleteComment(
    idContent: number,
    idReviewOwner: number,
    idCommentOwner: number
  ): Observable<any> {
    return this.http
      .delete(
        `${this.commentUrl}${idContent}/${idReviewOwner}/${idCommentOwner}`,
        this.httpOptions
      )
      .pipe(
        map((result: any) => result.data),
        //tap(result => console.log(result)),
        catchError(this.handleError)
      );
  }

  editComment(
    idContent: number,
    idReviewOwner: number,
    idCommentOwner: number,
    commentToEdit: { comment: string }
  ): Observable<any> {
    return this.http
      .put(
        `${this.commentUrl}${idContent}/${idReviewOwner}/${idCommentOwner}`,
        commentToEdit,
        this.httpOptions
      )
      .pipe(
        map((result: any) => result.data),
        //tap(result => console.log(result)),
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
