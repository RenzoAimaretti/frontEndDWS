import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginRequest } from '../../interface/loginRequest';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginService) { }

  loginForm = this.formBuilder.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(8)]]
  });


  ngOnInit(): void {}

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  login(){
    if(this.loginForm.valid){;
      if (this.loginForm.valid) {
        this.loginService.login(this.loginForm.value as LoginRequest);
        this.router.navigate(['/dashboard']);
        this.loginForm.reset();
      } else {
        console.log('Email or password is null');
      }
    }else{
      this.loginForm.markAllAsTouched();
      console.log('Formulario no valido');
    }
  }
}
