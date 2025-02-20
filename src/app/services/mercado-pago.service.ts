import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../environments/environment.js';

@Injectable({
  providedIn: 'root',
})
export class MercadoPagoService {
  constructor(private http: HttpClient) {}

  createPreference(orderData: {
    title: string;
    quantity: number;
    unit_price: number;
  }) {
    try {
      const response = this.http
        .post<{ url: string }>(
          `${environment.domainBack}/api/mp/create_preference`,
          orderData
        )
        .pipe(map((res) => res));
      return response;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
