import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../interface/loginRequest';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    //prueba login de usuario
    try {
      this.loginUser();
    } catch (error) {
      console.error(error);
    }
    //intentar login de admin si falla usuario
    try {
      this.loginAdmin();
    } catch (error) {
      console.error(error);
    }
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('Complete');
          this.router.navigate(['/dashboard']);
          this.loginForm.reset();
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Formulario no válido');
    }
  }

  loginAdmin() {
    if (this.loginForm.valid) {
      this.authService
        .loginAdmin(this.loginForm.value as LoginRequest)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            console.log('Complete');
            this.router.navigate(['/adminDashboard']); //no lo implemente todavia en el front
            this.loginForm.reset();
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Formulario no válido');
    }
  }
}
