import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  //usuario logueado
  userLoginOn: boolean = false;
  //admin logueado
  adminLoginOn: boolean = false;
  input: string = '';
  constructor(private authService: AuthService) {}

  enviar() {
    console.log(this.input);
  }

  logOut() {
    this.authService.logout();
  }

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
      },
    });
    this.authService.isAdminLoggedIn().subscribe({
      next: (response) => {
        this.adminLoginOn = response;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Complete');
      },
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
