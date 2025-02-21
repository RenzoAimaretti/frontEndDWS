import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Movie } from '../../interface/movie.js';
import { TmdbService } from '../../services/tmdb-service.service.js';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from '../../shared/review/review.component.js';
import { AuthService } from '../../services/auth.service.js';
import { UserService } from '../../services/user.service.js';
import { MovieAddListComponent } from '../movie-add-list/movie-add-list.component.js';
@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, ReviewComponent, RouterModule, MovieAddListComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  movieId = -1;
  movie: Movie | null = null;
  genreString: string = '';
  imageUrl: string = '';
  posterUrl: string = '';

  showModal = false;
  userId?: number;
  userLoginOn: boolean = false;
  lists: any[] = [];
  constructor(
    private tmdbService: TmdbService,
    private authService: AuthService,
    private userServices: UserService
  ) {
    this.route.params.subscribe((params) => {
      this.movieId = Number(params['id']);
    });
  }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    this.tmdbService.getMovie(this.movieId).subscribe({
      next: (result) => {
        (this.movie = result),
          (this.genreString = this.movie.genres
            .map((genre) => genre.name)
            .join(', ')),
          (this.imageUrl = this.tmdbService.getBackdropUrl(
            this.movie.backdrop_path
          ));
        this.posterUrl = this.tmdbService.getPosterUrl(this.movie.poster_path);
      },
      error: (error) => console.log(error),
    });
  }

  handleModalChange(showModal: boolean) {
    this.showModal = showModal;
    console.log('Modal visibility changed:', this.showModal);
  }

  showList(): void {
    this.authService.getIdFromToken();
    this.authService.isUserLoggedIn().subscribe({
      next: (response) => {
        this.userLoginOn = response;
        this.authService.currentUser().subscribe({
          next: (response) => {
            this.userId = response;
            if (this.userId !== -1) {
              this.userServices.userLists(this.userId).subscribe({
                next: (response) => {
                  this.lists = response;
                  if (this.lists.length !== 0) {
                    this.showModal = true;
                    console.log('hay listas');
                  } else {
                    console.log('no hay listas');
                    this.showModal = true;
                  }
                },
                error: (err) => {
                  console.error('Error obteniendo las listas', err);
                },
              });
            } else {
              console.log('no hay usuario logueado');
              window.alert('Debes iniciar sesión para agregar a una lista');
            }
          },
          error: (err) => {
            console.error('Error obteniendo el usuario actual', err);
          },
        });
      },
      error: (err) => {
        console.error('Error verificando si el usuario está logueado', err);
      },
    });
  }
  closeModal() {
    this.showModal = false;
  }
}
