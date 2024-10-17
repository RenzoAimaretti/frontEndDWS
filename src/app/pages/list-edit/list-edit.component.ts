import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListService } from '../../services/list.service';
import { TmdbService } from '../../services/tmdb-service.service.js';
import { List } from '../../interface/list';
import { Movie } from '../../interface/movie';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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

  constructor(private listService: ListService, private TmdbService: TmdbService) {
    this.route.params.subscribe((params) => {
      this.listId = params['id'];
    });
  }

  ngOnInit(): void {
    if (this.listId !== undefined) {
      this.listService.getList(this.listId).subscribe({
        next: (response) => {
          this.list = {
            ...response,
            contents: response.contents.map((content: any) => ({
              ...content,
              id: content.idContent
            }))
          };
          this.loadMoviesForLists();
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  loadMoviesForLists(): void {
    if(this.list){
      for (const content of this.list.contents) {
        console.log('contenido',content)
        if (content) { 
          this.TmdbService.getMovie(content.id).subscribe({
            next: (response) => {
              console.log("respuesta", response);
              content.title = response.title;
              content.poster_path = response.poster_path;
            },
            error: (err) => {
              console.error('Error obteniendo la película', err);
            }
          });
        } else {
          console.error('ID de película no definido para este contenido:', content);
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
    console.log(this.list)
    this.listService.updateList(this.list!).subscribe({
      next: () => {
        console.log('Lista guardada exitosamente');
      },
      error: (error) => {
        console.error('Error guardando la lista:', error);
      },
    });
  }

  getImageUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
}
