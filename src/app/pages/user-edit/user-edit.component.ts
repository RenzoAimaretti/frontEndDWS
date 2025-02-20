import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../interface/user.js';
import { AuthService } from '../../services/auth.service.js';
import { UserService } from '../../services/user.service.js';
import { RangoCinefiloService } from '../../services/rangoCinefilo.service.js';
import { RangoCinefilo } from '../../interface/rangoCinefilo.js';
import { Subscription } from '../../interface/subscription.js';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class UserEditComponent implements OnInit {
  userLoginOn: boolean = false;
  user?: User;
  id?: number;
  editForm!: FormGroup; // Usamos FormGroup para gestionar el formulario
  email: any;
  name: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router,
    private fb: FormBuilder // Inyectamos FormBuilder para construir el formulario reactivo
  ) {}

  ngOnInit(): void {
    // Inicializar el formulario
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    // Verificar si el usuario está logueado y cargar sus datos
    this.authService.getIdFromToken();
    this.authService.isUserLoggedIn().subscribe({
      next: (response) => {
        this.userLoginOn = response;
        if (this.userLoginOn) {
          this.authService.currentUser().subscribe({
            next: (response) => {
              this.id = response;
              if (this.id) {
                this.userService.getUser(this.id).subscribe({
                  next: (response) => {
                    this.user = response;
                    this.editForm.patchValue(this.user); // Cargar datos en el formulario
                  },
                  error: (error) => {
                    console.log('Error fetching user:', error);
                  },
                });
              }
            },
            error: (error) => {
              console.log('Error fetching current user ID:', error);
            },
          });
        }
      },
      error: (error) => {
        console.log('Error checking login status:', error);
      },
    });
  }

  userUpdate(): void {
    if (this.editForm.valid && this.id !== undefined) {
      // Crear un objeto User con los valores del formulario

      const updatedUser = { id: this.id, ...this.editForm.value };
      console.log(updatedUser);
      // Llamar al servicio para actualizar el usuario
      this.userService.updateUser(updatedUser).subscribe({
        next: (response) => {
          console.log('User updated successfully');
        },
        error: (error) => {
          console.log('Error updating user', error);
        },
        complete: () => {
          console.log('Update operation complete');
        },
      });
    } else {
      throw new Error("Form is invalid or 'id' is undefined");
    }
  }

  userDelete(): void {
    if (this.user) {
      const confirmed = window.confirm(
        '¿Estás seguro de que deseas borrar este usuario?'
      );
      console.log(confirmed);

      if (confirmed) {
        this.userService.delateUser(this.user.id).subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            this.authService.clearToken().then(() => {
              this.router.navigate(['/home']);
            });
          },
        });
      } else {
        throw new Error("Invalid state: 'user' is undefined");
      }
    }
  }
}
