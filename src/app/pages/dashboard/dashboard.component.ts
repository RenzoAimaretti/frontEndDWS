import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service.js';
import { User } from '../../interface/user.js';
import { UserService } from '../../services/user.service.js';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  userLoginOn: boolean = false;
  user?: User;
  id?: number;
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.getIdFromToken();
    this.authService.isUserLoggedIn().subscribe({
      next: (response) => {
        this.userLoginOn = response;
        this.authService.currentUser().subscribe({
          next: (response) => {
            this.id = response;
            this.userService.getUser(this.id).subscribe({
              next: (Response) => {
                this.user = Response;
              },
            });
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }
}
