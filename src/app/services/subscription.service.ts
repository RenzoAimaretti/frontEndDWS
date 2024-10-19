import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from '../interface/subscription'; 
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root', 
})
export class SubscriptionService {
  private apiUrl = 'http://localhost:3000/api/subscription';
   private searchUrl ='http://localhost:3000/api/subscription/search?name='

  constructor(private http: HttpClient) {}

  createSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(this.apiUrl, subscription);
  }

  searchSubscription(query: string): Observable<Subscription[]> {
    return this.http.get<{ message: string, data:Subscription[] }>(`${this.searchUrl}${query}`)
      .pipe(
        map(result => result.data),
        catchError(this.handleError<Subscription[]>('searchSubscriptions', []))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
