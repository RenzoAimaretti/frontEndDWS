import { Injectable } from '@angular/core';
import { LoginRequest } from '../interface/loginRequest';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(request:LoginRequest): void {

    console.log(request);
  }
}
