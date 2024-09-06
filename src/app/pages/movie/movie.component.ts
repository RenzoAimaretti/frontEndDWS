import { Component,inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Movie } from '../../interface/movie.js';
import { TmdbService} from '../../services/tmdb-service.service.js';
import { CommonModule, NgFor } from '@angular/common';
import { AuthService } from '../../services/auth.service.js';
import { UserService } from '../../services/user.service.js';
@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
    route:ActivatedRoute=inject(ActivatedRoute);
    movieId=-1;
    movie: Movie|null= null;
    genreString: string='';
    imageUrl: string='';
    idUser:number = -1;
    userLoginOn:boolean = false;
    lists:any[] = [];
    selectedListId:number = -1;
    constructor(private tmdbService: TmdbService, private authService:AuthService, private userServices:UserService) {
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
            this.imageUrl = this.tmdbService.getBackdropUrl(this.movie.backdrop_path);
          },
          error: (error) => console.log(error)
        });
    }

    onSelectList(listId:number): void {
      this.selectedListId = listId;
    }

    selectList(): void {

    }

    showList(): void {
      this.authService.getIdFromToken();
      this.authService.isUserLoggedIn().subscribe({
        next: (response) => {
          this.userLoginOn = response;
          if (this.userLoginOn) {
            this.authService.currentUser().subscribe({
              next: (response) => {
                this.idUser = response;
                console.log(this.idUser);
                if (this.idUser !== -1) {
                  this.userServices.userLists(this.idUser).subscribe({
                    next: (response) => {
                      this.lists = response;
                      console.log(this.lists);
    
                      // Mover el chequeo aquí después de que `this.lists` haya sido actualizado.
                      if (this.lists.length !== 0) {
                        console.log("hay listas");
                      } else {
                        console.log('no hay listas');
                      }
                    },
                    error: (err) => {
                      console.error('Error obteniendo las listas', err);
                    }
                  });
                }
              },
              error: (err) => {
                console.error('Error obteniendo el usuario actual', err);
              }
            });
          } else {
            console.log('Usuario no logueado');
          }
        },
        error: (err) => {
          console.error('Error verificando si el usuario está logueado', err);
        }
      });
    }
  }