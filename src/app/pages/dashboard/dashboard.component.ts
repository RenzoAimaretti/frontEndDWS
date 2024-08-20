import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interface/user';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userLoginOn: boolean = false;
  user?: User
  id?:number
  constructor(private authService:AuthService, private userService:UserService) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe({
      next: (response) => {
        this.userLoginOn = response;
        const currentId =  Number(this.authService.currentUserId.value);
        this.userService.getUser(currentId).subscribe({
        next: (Response)=>{
        this.user=Response;
      }
    })
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Complete');
      }
    });
    
  }
  

}
