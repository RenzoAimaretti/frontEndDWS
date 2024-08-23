import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { registerRequest } from '../../interface/registerRequest';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private formBuilder:FormBuilder,private router:Router,private authService:AuthService) { }

  registerForm = this.formBuilder.group({
    name:['',[Validators.required]],
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(8)]]
  })

  get name(){
    return this.registerForm.get('name');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }


  register():void{
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value as registerRequest).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('Complete');
          this.router.navigate(['/login']);
          this.registerForm.reset();
        }
      });
    }else{
      this.registerForm.markAllAsTouched();
      console.log('Formulario no válido');
    }

  }

}
