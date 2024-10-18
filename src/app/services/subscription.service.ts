import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from '../interface/subscription'; 
@Injectable({
  providedIn: 'root', 
})
export class SubscriptionService {
  private apiUrl = 'http://localhost:3000/api/subscription';

  constructor(private http: HttpClient) {}

  createSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(this.apiUrl, subscription); 
  }
}
