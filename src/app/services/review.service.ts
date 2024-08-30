import { Injectable } from '@angular/core';
import { Review } from '../interface/review';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private ownerId?:number;
  private idCommentOwner?:number;
  private reviewUrl = 'http://localhost:3000/api/review/';
  private commentUrl = 'http://localhost:3000/api/review/comment/';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http:HttpClient, private authService:AuthService) { }

  postReview(idContent:number,reviewToPost:{nameContent:string,rating:number,description:string}): Observable <any>{
    this.authService.getIdFromToken();
    this.authService.currentUser().subscribe({
      next:(response)=>{
        this.ownerId=response;}})
    return this.http.post<Review>(`${this.reviewUrl}${idContent}/${this.ownerId}`,reviewToPost,this.httpOptions).pipe(
    map((result:any)=>result),
    tap(result=>console.log(result)),
    catchError(this.handleError)
  )
  };

  deleteReview(idContent:number): Observable<any>{
    const ownerId = this.authService.currentUserId.value;
    return this.http.delete(`${this.reviewUrl}${idContent}/${ownerId}`,this.httpOptions).pipe(
      map((result:any)=>result.data),
      tap(result=>console.log(result)),
      catchError(this.handleError)
    )
    
  };

  getReviews(idContent:number): Observable<Review[]>{
    console.log('idContent:',idContent)
    return this.http.get<Review[]>(`${this.reviewUrl}${idContent}`).pipe(
      map((result:any)=>result.data),
      tap(result=>console.log(result)),
      catchError(this.handleError))
  };

  postComment(idContent:number,idReviewOwner:number,commentToPost:{comment:string}): Observable<any>{
    this.authService.getIdFromToken();
    this.authService.currentUser().subscribe({
      next:(response)=>{
        this.idCommentOwner=response;
      }})
      
    console.log('hola')
    
    console.log('chau')

    return this.http.post(`${this.commentUrl}${idContent}/${idReviewOwner}/${this.idCommentOwner}`, commentToPost, this.httpOptions).pipe(
      map((result:any)=>result.data),
      tap(result=>console.log(result)),
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
  };
};
