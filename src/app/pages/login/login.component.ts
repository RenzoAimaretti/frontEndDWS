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

  errorUser = false;
  errorAdmin = false;

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    //prueba login de usuario

    // Ejecutar login de usuario y admin en paralelo y esperar a que ambas se completen
    Promise.all([this.loginUser(), this.loginAdmin()])
      .then(() => {
        if (this.errorUser && this.errorAdmin) {
          window.alert('Credenciales incorrectas');
        }
      })
      .catch((error) => {
        console.error('Error during login process:', error);
      });
  }

  loginUser(): Promise<void> {
    return new Promise((resolve) => {
      if (this.loginForm.valid) {
        this.authService.login(this.loginForm.value as LoginRequest).subscribe({
          next: (response) => {
            this.errorUser = false;
            console.log('Login satisfactorio, bienvenido usuario');
          },
          error: (error) => {
            console.log(error);
            this.errorUser = true;
            resolve();
          },
          complete: () => {
            console.log('Complete');
            this.router.navigate(['/dashboard']);
            this.loginForm.reset();
            resolve();
          },
        });
      }
    });
  }

  loginAdmin(): Promise<void> {
    return new Promise((resolve) => {
      if (this.loginForm.valid) {
        this.authService
          .loginAdmin(this.loginForm.value as LoginRequest)
          .subscribe({
            next: (response) => {
              this.errorAdmin = false;
              console.log('Login satisfactorio, bienvenido administrador');
            },
            error: (error) => {
              console.log(error);
              this.errorAdmin = true;
              resolve();
            },
            complete: () => {
              console.log('Complete');
              this.router.navigate(['/adminDashboard']); //no lo implemente todavia en el front
              this.loginForm.reset();
              resolve();
            },
          });
      }
    });
  }
}
