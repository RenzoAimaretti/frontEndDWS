import { Component, inject, Input } from '@angular/core';
import { Movie } from '../../interface/movie.js';
import { TmdbService } from '../../services/tmdb-service.service.js';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component.js';

@Component({
  selector: 'app-show-movies',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchComponent],
  templateUrl: './show-movies.component.html',
  styleUrls: ['./show-movies.component.css'],
})
export class ShowMoviesComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  movies: Movie[] = [];
  title = '';
  constructor(private tmdbService: TmdbService) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.title = queryParams['query'];
      this.search();
    });
  }

  getShortOverview(overview: string): string {
    const maxLength = 50;
    return overview.length > maxLength
      ? overview.substring(0, maxLength) + '...'
      : overview;
  }

  getImageUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  search(): void {
    this.tmdbService.searchByTitle(this.title).subscribe({
      next: (movies) => (this.movies = movies),
      error: (error) => console.log(error),
    });
  }
}
