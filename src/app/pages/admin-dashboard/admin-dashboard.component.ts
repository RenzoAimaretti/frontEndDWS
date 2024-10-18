import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'] // Cambiado a styleUrls
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}

  goToCreateSubscription(): void {
    this.router.navigate(['/create-subscription']); // Navega a la página de crear suscripción
  }

  goToCreateRangoCinefilo(): void {
    this.router.navigate(['/create-rango-cinefilo']); // Navega a la página de crear rangoCinefilo
  }
}
