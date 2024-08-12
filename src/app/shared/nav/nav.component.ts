import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  userLoginOn: boolean = false;
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
