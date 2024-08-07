import { Component,inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Movie } from '../movie.js';
import { TmdbService} from '../tmdb-service.service.js';
@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
    route:ActivatedRoute=inject(ActivatedRoute);
    movieId=-1;
    movie: Movie|null= null;
    constructor(private tmdbService: TmdbService) {
      this.route.params.subscribe(params => {
        this.movieId = params['id'];
      });
    }
  
    async ngOnInit(): Promise<void> {
        await this.getMovie();
    }
    
    async getMovie(): Promise<void> {
        this.tmdbService.getMovie(this.movieId).subscribe({
          next: (result) => {console.log(result), this.movie = result},
          error: (error) => console.log(error)
        });
  }
}
