import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie } from '../../interface/movie.js';
import { TmdbService} from '../../services/tmdb-service.service.js';
import { CarrouselComponent } from '../../shared/carrousel/carrousel.component.js';

@Component({
  selector: 'app-list-create',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-create.component.html',
  styleUrl: './list-create.component.css'
})
export class ListCreateComponent {
  showMovies: Movie [] = [];
  movies: Movie[] = [];

  constructor(private tmdbService: TmdbService) {}

  async ngOnInit(): Promise<void> {
    await this.loadMovies();
  }

  async loadMovies(): Promise<void> {
    this.tmdbService.getPopularMovies().subscribe({
      next: (movies) => this.showMovies = movies,
      error: (error) => console.error(error)
    });
  }

  
}
