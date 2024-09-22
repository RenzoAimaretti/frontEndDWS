import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
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
  isAlreadyFollowing?:boolean
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
        next: (result) => {
          this.user = result
          this.updateFollowingStatus();
        },
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
          next:()=> {
            this.loadUser();
          },
          error: () => window.alert('No puedes seguir a alguien que ya sigues')
        });
        
      }
    }
  }
  // les quiero clavar un pop over pero no va
  unfollowUser():void{
    if(this.isUserLogged && this.loggedUserId!=null ){
      if(this.user){
        this.userService.unfollowUser(this.user.id,this.loggedUserId).subscribe({
          next:()=> {
            this.loadUser();
          },
          error: () => window.alert('No puedes dejar de seguir a alguien que ya sigues')
        })
      }
    }
  }

  updateFollowingStatus():void{
    if(this.isUserLogged && this.loggedUserId!=null ){
      if(this.user){
        this.userService.isFollowing(this.loggedUserId,this.user.id).subscribe({
          next:(response)=>{
            this.isAlreadyFollowing=response;
          },
          error:()=>console.log('Error al verificar si el usuario ya sigue a otro')
        })
      }
    }
  }
}
