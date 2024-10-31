import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ListService } from '../../services/list.service.js';
import { List } from '../../interface/list.js';
import { TmdbService } from '../../services/tmdb-service.service.js';
import { UserService } from '../../services/user.service.js';

@Component({
  selector: 'app-list-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-details.component.html',
  styleUrl: './list-details.component.css'
})
export class ListDetailsComponent {
  route:ActivatedRoute=inject(ActivatedRoute);
  listId=-1;
  list: List|null= null;
  constructor(private listService: ListService, private tmdbService: TmdbService, private userService:UserService) {
    this.route.params.subscribe(params => {
    this.listId = params['id'];
  });
}

ngOnInit(): void {
  this.getList();
}

getList():void{
  this.listService.getList(this.listId).subscribe({
    next: (response) => {this.list = {
      ...response,
      contents: response.contents.map((content: any) => ({
        ...content,
        id: content.idContent
      }))
    };
    console.log("este es el dueño",this.list.owner);
    this.loadMoviesForLists();
    },
    error: (error) => console.log(error)
  })
}

loadMoviesForLists(): void {
  console.log("entro a loadMoviesForLists");
  console.log(this.list)
  
  if (this.list !== null) {
    
    for (const content of this.list.contents) {
      console.log('contenido',content)
      if (content) { 
        this.tmdbService.getMovie(content.id).subscribe({
          next: (response) => {
            console.log("respuesta", response);
            content.title = response.title;
            content.poster_path = response.poster_path;
          },
          error: (err) => {
            console.error('Error obteniendo la película', err);
          }
        });
      } else {
        console.error('ID de película no definido para este contenido:', content);
      }
    }
  }
}

getImageUrl(path: string): string {
  return `https://image.tmdb.org/t/p/w500${path}`;
}

}