import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { List } from '../interface/list.js'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class userListsService {

  constructor(private http: HttpClient) { }

  // Método para obtener las listas del usuario y mapear el idContent a id
  getUserLists(userId: number): Observable<List[]> {
    return this.http.get<List[]>(`/api/user/${userId}/lists`)
      .pipe(
        map((lists: List[]) => 
          lists.map((list: List) => ({
            ...list,
            contents: list.contents.map((content: any) => ({
              ...content,
              id: content.idContent // Mapeo de idContent a id
            }))
          }))
        )
      );
  }

  // Método para obtener los detalles de la película desde TMDb
  getMovieDetailsForList(list: List): Observable<List> {
    return new Observable<List>((observer) => {
      const requests = list.contents.map(content =>
        this.getMovie(content.id).toPromise().then(response => {
          content.title = response.title;
          content.poster_path = response.poster_path;
        })
      );
      // Una vez que todas las peticiones terminen, enviamos la lista actualizada
      Promise.all(requests).then(() => {
        observer.next(list);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  // Método que obtiene una película específica desde TMDb
  getMovie(id: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}?api_key=TU_API_KEY`);
  }
}
