import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable,catchError,of } from 'rxjs';
import { Movie } from './movie';
@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  readonly API_KEY = 'bf8165ffd8ab851cb56ba8f197507c52';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  constructor(private http: HttpClient) {}

  //getPopularMovies():Observable<Movie>{
    //return this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}`);
  //}

  getMovie(id: number): Observable<Movie>{
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.API_KEY}`)
    .pipe(
      map((result: any) => result.data),
      catchError(this.handleError<Movie>('getUser')
      
    ));
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
