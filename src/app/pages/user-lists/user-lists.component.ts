import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service.js';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { List } from '../../interface/list.js';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb-service.service.js';



@Component({
  selector: 'app-user-lists',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-lists.component.html',
  styleUrl: './user-lists.component.css'
})
export class UserListsComponent {
  route:ActivatedRoute=inject(ActivatedRoute);
  userId?:number
  lists: List [] = []
  constructor(private userServices: UserService, private tmdbService: TmdbService) { 
    this.route.params.subscribe(params => {
      this.userId = params['id'];
   });
  }


  async ngOnInit():Promise<void>{
    this.route.queryParams.subscribe(queryParams =>{
      console.log(this.userId)
      this.userLists()
      console.log(this.lists)
    })
  }

  userLists(): void {
    if(this.userId !== undefined){
      this.userServices.userLists(this.userId).subscribe({
        next: (response) => {
          this.lists = response;
          console.log(this.lists);
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
  }

  getImageUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
}  
