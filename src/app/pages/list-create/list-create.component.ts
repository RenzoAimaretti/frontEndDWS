import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Movie } from '../../interface/movie.js';
import { TmdbService } from '../../services/tmdb-service.service.js';
import { List } from '../../interface/list.js';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service.js';
import { ListService } from '../../services/list.service.js';
import { User } from '../../interface/user.js';
import { UserService } from '../../services/user.service.js';

@Component({
  selector: 'app-list-create',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './list-create.component.html',
  styleUrl: './list-create.component.css',
})
export class ListCreateComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  movies: Movie[] = [];
  id?: number;
  movieId?: number;
  list?: List;
  listForm!: FormGroup;
  selectedMovies: Movie[] = [];
  userId?: number;
  constructor(
    private tmdbService: TmdbService,
    private fb: FormBuilder,
    private listService: ListService,
    private authService: AuthService,
    private userServices: UserService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      if (params['id'] !== undefined) {
        this.id = Number(params['id']);
      }
    });
  }

  ngOnInit(): void {
    if (this.id !== undefined) {
      this.tmdbService.getMovie(this.id).subscribe({
        next: (result) => {
          this.selectedMovies.push(result);
        },
        error: (error) => console.log(error),
      });
    }

    this.listForm = this.fb.group({
      nameList: ['', Validators.required],
      descriptionList: ['', Validators.required],
      title: [''],
    });

    this.authService.getIdFromToken();
    this.authService.currentUser().subscribe({
      next: (response) => {
        this.userId = response;
      },
      error: (error) => console.log(error),
    });
  }
  get nameList() {
    return this.listForm.get('nameList');
  }
  get description() {
    return this.listForm.get('description');
  }
  get title() {
    return this.listForm.get('title');
  }
  async searchMovie(): Promise<void> {
    const titleValue = this.title?.value;
    this.tmdbService.searchByTitle(titleValue).subscribe({
      next: (movies) => (this.movies = movies),
      error: (error) => console.log(error),
    });
  }

  onSelectMovie(movie: Movie): void {
    const movieIndex = this.selectedMovies.findIndex(
      (selected) => selected.id === movie.id
    );

    if (movieIndex >= 0) {
      this.selectedMovies.splice(movieIndex, 1);
    } else {
      this.selectedMovies.push(movie);
    }

    const movieElement = document.getElementById(`movie-${movie.id}`);
    if (movieElement) {
      movieElement.classList.toggle('selected');
    }
  }

  isMovieSelected(movie: Movie): boolean {
    return this.selectedMovies.some((selected) => selected.id === movie.id);
  }

  createList(): void {
    if (this.listForm.valid) {
      if (this.userId) {
        const { title, ...formDataWithoutTitle } = this.listForm.value;

        this.list = {
          owner: this.userId,
          ...formDataWithoutTitle,
          contents: this.selectedMovies,
        };
      }

      if (this.list) {
        this.listService.createList(this.list).subscribe({
          next: (response) => {
            alert('Lista creada exitosamente!');
            this.listForm.reset();
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            console.log('Error creating List:', error);
          },
        });
      }
    } else {
      alert('Una lista debe contener nombre y descripción.');
    }
  }

  getImageUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
}
