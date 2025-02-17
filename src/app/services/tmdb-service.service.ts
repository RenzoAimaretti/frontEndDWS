import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, catchError, of } from 'rxjs';
import { Movie } from '../interface/movie';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  readonly API_KEY = `${environment.apiKeyTMBD}`; // Add your API key here
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  //getPopularMovies():Observable<Movie>{
  //return this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}`);
  //}

  getMovie(id: number): Observable<Movie> {
    return this.http
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.API_KEY}`)
      .pipe(
        map((result: any) => result),
        catchError(this.handleError<Movie>('getUser'))
      );
  }

  getPopularMovies(): Observable<Movie[]> {
    return this.http
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}`)
      .pipe(
        map((result: any) => result.results),
        catchError(this.handleError<Movie[]>('getPopularMovies', []))
      );
  }

  getTopRatedMovies(): Observable<Movie[]> {
    return this.http
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.API_KEY}`
      )
      .pipe(
        map((result: any) => result.results),
        catchError(this.handleError<Movie[]>('getTopRatedMovies', []))
      );
  }

  getUpcomingMovies(): Observable<Movie[]> {
    return this.http
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.API_KEY}`
      )
      .pipe(
        map((result: any) => result.results),
        catchError(this.handleError<Movie[]>('getUpcomingMovies', []))
      );
  }
  getBackdropUrl(path: string): string {
    return `https://image.tmdb.org/t/p/original${path}`;
  }

  getPosterUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  searchByTitle(title: string): Observable<Movie[]> {
    return this.http
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${this.API_KEY}`
      )
      .pipe(
        map((result: any) => result.results),
        catchError(this.handleError<Movie[]>('searchByTitle', []))
      );
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
