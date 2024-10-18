import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscripcionService {
  private apiUrl = 'http://localhost:3000/api/subscriptions'; // Ajusta la URL si es necesario

  constructor(private http: HttpClient) {}

  createSubscripcion(subscripcionData: { name: string; cantidadSem: number }): Observable<any> {
    return this.http.post(this.apiUrl, subscripcionData);
  }
}
