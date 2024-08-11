import { Component,inject } from '@angular/core';
import { CarrouselComponent } from '../carrousel/carrousel.component';
import { Movie } from '../movie';
import { TmdbService} from '../tmdb-service.service.js';
import { CarrouselSpotlightComponent } from '../carrousel-spotlight/carrousel-spotlight.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarrouselComponent,CarrouselSpotlightComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  popularMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];

  constructor(private tmdbService: TmdbService) {}

  async ngOnInit(): Promise<void>{
    await this.loadMovies();
  }

  async loadMovies(): Promise<void> {
    this.tmdbService.getPopularMovies().subscribe({
      next: (movies) => this.popularMovies = movies,
      error: (error) => console.error(error)
    });
    this.tmdbService.getTopRatedMovies().subscribe({
      next: (movies) => this.topRatedMovies = movies,
      error: (error) => console.error(error)
    });
    this.tmdbService.getUpcomingMovies().subscribe({
      next: (movies) => this.upcomingMovies = movies,
      error: (error) => console.error(error)
    });
}
}