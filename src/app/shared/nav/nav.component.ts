import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  userLoginOn: boolean = false;
  input:string = '';
  constructor(private loginService:LoginService) { }

  enviar(){
    console.log(this.input)
  }

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
