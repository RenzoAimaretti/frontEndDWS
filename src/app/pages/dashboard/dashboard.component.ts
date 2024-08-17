import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interface/user';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userLoginOn: boolean = false;
  userData?: User;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe({
      next: (response) => {
        this.userLoginOn = response;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Complete');
      }
    });
    this.authService.getUserData().subscribe({
      next: (userData) => {
        this.userData = userData;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Complete');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authService.currentUserLoginOn) {
      this.authService.currentUserLoginOn.unsubscribe();
    }
    if (this.authService.currentUserData) {
      this.authService.currentUserData.unsubscribe();
    }
  }
}
