import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchSubscriptionComponent } from '../search-subscription/search-subscription.component.js';
import { AuthService } from '../../services/auth.service.js';
import { Admin } from '../../interface/admin.js';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SearchSubscriptionComponent, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'], // Cambiado a styleUrls
})
export class AdminDashboardComponent {
  adminLoginOn: boolean = false;
  admin?: Admin;
  idAdmin?: number;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAdminIdFromToken();
    this.authService.isAdminLoggedIn().subscribe({
      next: (isLoggedIn) => {
        this.adminLoginOn = isLoggedIn;
        this.authService.currentAdmin().subscribe({
          next: (response) => {
            this.idAdmin = response;
            this.authService.getAdmin().subscribe({
              next: (Response: Admin) => {
                this.admin = Response;
              },
            });
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            console.log('Complete');
          },
        });
      },
    });
  }
  goToCreateSubscription(): void {
    this.router.navigate(['/create-subscription']); // Navega a la página de crear suscripción
  }

  goToCreateRangoCinefilo(): void {
    this.router.navigate(['/create-rango-cinefilo']); // Navega a la página de crear rangoCinefilo
  }

  goToManageSuggestions(): void {
    this.router.navigate(['/manage-suggestions']); // Navega a la página de gestionar sugerencias
  }
}
