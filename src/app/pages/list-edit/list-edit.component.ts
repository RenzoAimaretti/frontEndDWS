import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ListService } from '../../services/list.service';
import { TmdbService } from '../../services/tmdb-service.service.js';
import { List } from '../../interface/list';
import { Movie } from '../../interface/movie';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service.js';

@Component({
  selector: 'app-list-edit',
  standalone: true,
  templateUrl: './list-edit.component.html',
  imports: [CommonModule, FormsModule, RouterLink],
  styleUrls: ['./list-edit.component.css'],
})
export class ListEditComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  listId?: number;
  list?: List;
  movies: Movie[] = [];
  searchQuery = '';
  showDelete = false;
  userId?: number;
  idCurrent?: number;

  constructor(
    private listService: ListService,
    private TmdbService: TmdbService,
    private authService: AuthService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.listId = params['id'];
      this.userId = params['userId'];
    });
  }

  ngOnInit(): void {
    if (this.listId !== undefined) {
      this.authService.getIdFromToken();
      this.authService.currentUser().subscribe({
        next: (response) => {
          this.idCurrent = response;
        },
      });
      if (this.idCurrent == this.userId) {
        console.log('el ususario coincide', this.userId);
        this.listService.getList(this.listId).subscribe({
          next: (response) => {
            this.list = {
              ...response,
              contents: response.contents.map((content: any) => ({
                ...content,
                id: content.idContent,
              })),
            };
            this.loadMoviesForLists();
          },
          error: (error) => {
            console.error(error);
          },
        });
      } else {
        console.log('el usuario no coincide', this.userId);
        window.alert('No puedes editar las listas de otro usuario');
      }
    }
  }

  loadMoviesForLists(): void {
    if (this.list) {
      for (const content of this.list.contents) {
        console.log('contenido', content);
        if (content) {
          this.TmdbService.getMovie(content.id).subscribe({
            next: (response) => {
              console.log('respuesta', response);
              content.title = response.title;
              content.poster_path = response.poster_path;
            },
            error: (err) => {
              console.error('Error obteniendo la película', err);
            },
          });
        } else {
          console.error(
            'ID de película no definido para este contenido:',
            content
          );
        }
      }
    }
  }

  searchMovie(): void {
    this.TmdbService.searchByTitle(this.searchQuery).subscribe({
      next: (movies) => {
        this.movies = movies;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  isMovieInList(movie: Movie): boolean {
    return this.list?.contents?.some((m) => m.id === movie.id) ?? false;
  }

  toggleMovie(movie: Movie): void {
    if (this.isMovieInList(movie)) {
      this.removeMovie(movie);
    } else {
      this.addMovie(movie);
    }
  }

  addMovie(movie: Movie): void {
    this.list?.contents.push(movie);
  }

  removeMovie(movie: Movie): void {
    this.list!.contents = this.list!.contents.filter((m) => m.id !== movie.id);
  }

  saveList(): void {
    if (!this.list?.nameList || !this.list?.descriptionList) {
      window.alert('Una lista debe contener nombre y descripción.');
    } else {
      this.listService.updateList(this.list!).subscribe({
        next: (result) => {
          console.log('Lista guardada exitosamente', result);
          this.router.navigate(['/user/lists', this.userId], {
            queryParams: { refresh: true },
          });
        },
        error: (error) => {
          console.error('Error guardando la lista:', error);
        },
      });
    }
  }

  deleteList(): void {
    let response = window.confirm(
      '¿Estás seguro de que quieres eliminar la lista?'
    );
    if (response) {
      this.listService.deleteList(this.listId!).subscribe({
        next: (result) => {
          console.log('Lista eliminada exitosamente', result);
          this.router.navigate(['/user/lists', this.userId], {
            queryParams: { refresh: true },
          });
        },
        error: (error) => {
          console.error('Error eliminando la lista:', error);
        },
      });
    }
  }

  getImageUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
}
