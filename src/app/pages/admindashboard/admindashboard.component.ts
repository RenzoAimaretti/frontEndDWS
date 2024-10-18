import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdminComponent {
  constructor(private router: Router) {}

  createSubscripcion() {
    this.router.navigate(['../create-subscripcion']); 
  }
  createRangoCinefilo() {
    this.router.navigate(['../create-rango-cinefilo']); 
  }
}
