import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from '../interface/subscription.js';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment.js';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private apiUrl = `${environment.domainBack}/api/subscription`;
  private searchUrl = `${environment.domainBack}/api/subscription/search?name=`;

  constructor(private http: HttpClient) {}

  createSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(this.apiUrl, subscription);
  }
  getSubscriptionById(id: number): Observable<Subscription> {
    return this.http
      .get<{ message: string; data: Subscription }>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  searchSubscription(query: string): Observable<Subscription[]> {
    return this.http
      .get<{ message: string; data: Subscription[] }>(
        `${this.searchUrl}${query}`
      )
      .pipe(
        map((result) => result.data),
        catchError(this.handleError<Subscription[]>('searchSubscriptions', []))
      );
  }
  editSubscription(
    id: number,
    subscription: Subscription
  ): Observable<Subscription> {
    return this.http
      .put<Subscription>(`${this.apiUrl}/${id}`, subscription)
      .pipe(catchError(this.handleError<Subscription>('editSubscription')));
  }

  getSubscriptions(): Observable<Subscription[]> {
    return this.http
      .get<{ message: string; data: Subscription[] }>(this.apiUrl)
      .pipe(
        map((response) => response.data),
        catchError(this.handleError<Subscription[]>('getSubscriptions', []))
      );
  }

  deleteSubscription(id: number): Observable<{ message: string }> {
    return this.http
      .delete<{ message: string }>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError<{ message: string }>('deleteSubscription'))
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
