import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RangoCinefilo } from '../interface/rangoCinefilo';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RangoCinefiloService {
  private apiUrl ='http://localhost:3000/api/rangos' ; 
  private searchUrl ='http://localhost:3000/api/rangos/search?nameRango='
  constructor(private http: HttpClient) {}

  createRangoCinefilo(rangoCinefilo: any): Observable<any> {
    return this.http.post(this.apiUrl, rangoCinefilo);
  }

  searchRangoCinefilo(query: string): Observable<RangoCinefilo[]> {
    return this.http.get<{ message: string, data: RangoCinefilo[] }>(`${this.searchUrl}${query}`)
      .pipe(
        map(result => result.data),
        catchError(this.handleError<RangoCinefilo[]>('searchRangoCinefilos', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  
    getRangoCinefiloById(id: number): Observable<RangoCinefilo> {
      return this.http.get<{ message: string; data: RangoCinefilo }>(`${this.apiUrl}/${id}`).pipe(
        map(response => response.data)
    );
}
  
   
    editRangoCinefilo(id: number, rangoCinefilo: RangoCinefilo): Observable<RangoCinefilo> {
      return this.http.put<RangoCinefilo>(`${this.apiUrl}/${id}`, rangoCinefilo)
      .pipe(catchError(this.handleError<RangoCinefilo>('editSubscription')));
  }

  
   
    deleteRangoCinefilo(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  }

