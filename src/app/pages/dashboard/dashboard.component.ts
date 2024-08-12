import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
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
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginService.isUserLoggedIn().subscribe({
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
    this.loginService.getUserData().subscribe({
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
    if (this.loginService.currentUserLoginOn) {
      this.loginService.currentUserLoginOn.unsubscribe();
    }
    if (this.loginService.currentUserData) {
      this.loginService.currentUserData.unsubscribe();
    }
  }
}
