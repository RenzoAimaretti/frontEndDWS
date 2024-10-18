import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RangoCinefiloService {
  private apiUrl ='http://localhost:3000/api/rangos' ; 

  constructor(private http: HttpClient) {}

  createRangoCinefilo(rangoCinefilo: any): Observable<any> {
    return this.http.post(this.apiUrl, rangoCinefilo);
  }
}
