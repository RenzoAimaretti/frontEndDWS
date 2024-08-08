import { Component,inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Movie } from '../movie.js';
import { TmdbService} from '../tmdb-service.service.js';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
    route:ActivatedRoute=inject(ActivatedRoute);
    movieId=-1;
    movie: Movie|null= null;
    genreString: string='';
    imageUrl: string='';
    constructor(private tmdbService: TmdbService) {
      this.route.params.subscribe(params => {
        this.movieId = Number(params['id']);
      });
    }
  
    async ngOnInit(): Promise<void> {
        await this.getMovie();
        
    }
    
    async getMovie(): Promise<void> {
        this.tmdbService.getMovie(this.movieId).subscribe({
          next: (result) => {console.log(result), 
            this.movie = result, 
            this.genreString = this.movie.genres.map((genre) => genre.name).join(", "),
            this.imageUrl = `https://image.tmdb.org/t/p/w500${result.poster_path}`},
            error: (error) => console.log(error)
        });

        

  }
}
