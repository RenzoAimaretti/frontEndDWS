import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MercadoPagoService {
  constructor(private http: HttpClient) {}

  async createPreference(orderData: {
    title: string;
    quantity: number;
    unit_price: number;
  }) {
    try {
      console.log(orderData);
      const response = await this.http
        .post<{ url: string }>(
          'http://localhost:3000/api/mp/create_preference',
          orderData
        )
        .pipe(map((res) => res))
        .toPromise();
      return response;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
