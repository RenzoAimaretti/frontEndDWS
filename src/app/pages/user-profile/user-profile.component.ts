import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { User } from '../../interface/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  userId: number | null = null;
  user: User | null = null;
  isUserLogged?:boolean;
  loggedUserId?:number;
  constructor(private userService: UserService, private authService:AuthService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userId = +id; // Convert to number
        this.loadUser();
      }
      this.authService.getIdFromToken();
      this.authService.isUserLoggedIn().subscribe({
        next: (response) => {
          this.isUserLogged = response;
          this.authService.currentUser().subscribe({
            next:(response)=>{
              this.loggedUserId=response;
            }
          });
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('Complete');
        }
      })
    });
  }

  loadUser(): void {
    if (this.userId !== null) {
      this.userService.getUser(this.userId).subscribe({
        next: (result) => this.user = result,
        error: (error) => console.error('Error loading user', error)
      });
    }
  }

  //Estaria bueno un metodo para retornar de antemano si el usuario logueado ya lo esta siguiendo
  // y asi poner un boton se seguir o dejar de seguir respectivamente

  followUser():void{
    if(this.isUserLogged && this.loggedUserId!=null ){
      if(this.user){
        this.userService.followUser(this.user.id,this.loggedUserId).subscribe({
          next:()=> this.loadUser(),
          error: (error) => console.error('Error following user', error)
        });
        
      }
    }
  }

  unfollowUser():void{
    console.log('Funcionalidad en desarrollo...')
  }
}
