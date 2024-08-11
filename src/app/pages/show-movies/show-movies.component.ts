import { Component, inject, Input } from '@angular/core';
import { Movie } from '../../interface/movie.js';
import { TmdbService } from '../../services/tmdb-service.service.js';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-show-movies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './show-movies.component.html',
  styleUrl: './show-movies.component.css'
})
export class ShowMoviesComponent {
  route:ActivatedRoute=inject(ActivatedRoute);
  movies: Movie[] = []
  title=''
  constructor(private tmdbService: TmdbService) {
    
  }
  async ngOnInit():Promise<void>{
    this.route.queryParams.subscribe(queryParams =>{
      this.title = queryParams['title']
      this.search()
    })
    
    
}

getImageUrl(path: string): string {
  return `https://image.tmdb.org/t/p/w500${path}`;
}

  async search():Promise<void>{
    this.tmdbService.searchByTitle(this.title).subscribe({
      next:(movies) => this.movies = movies,
      error:(error) => console.log(error)
    });
    }
}
