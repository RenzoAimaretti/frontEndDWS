import { Component, inject } from '@angular/core';
import { CarrouselComponent } from '../../shared/carrousel/carrousel.component';
import { Movie } from '../../interface/movie';
import { TmdbService } from '../../services/tmdb-service.service';
import { CarrouselSpotlightComponent } from '../../shared/carrousel-spotlight/carrousel-spotlight.component';
import { SuggestionsComponent } from '../../shared/suggestions/suggestions.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarrouselComponent,
    CarrouselSpotlightComponent,
    SuggestionsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  popularMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];

  constructor(private tmdbService: TmdbService) {}

  async ngOnInit(): Promise<void> {
    this.loadMovies();
  }

  loadMovies(): void {
    this.tmdbService.getPopularMovies().subscribe({
      next: (movies) => (this.popularMovies = movies),
      error: (error) => console.error(error),
    });
    this.tmdbService.getTopRatedMovies().subscribe({
      next: (movies) => (this.topRatedMovies = movies),
      error: (error) => console.error(error),
    });
    this.tmdbService.getUpcomingMovies().subscribe({
      next: (movies) => (this.upcomingMovies = movies),
      error: (error) => console.error(error),
    });
  }
}
