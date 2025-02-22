import { Component } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service.js';
import { FormsModule } from '@angular/forms';
import { Subscription } from '../../interface/subscription.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-subscription',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-subscription.component.html',
  styleUrls: ['./create-subscription.component.css'],
})
export class CreateSubscriptionComponent {
  subscription: Subscription = {
    name: '',
    cantidadSem: 0,
    precio: 0,
  };

  constructor(
    private subscriptionService: SubscriptionService,
    public router: Router
  ) {}

  onSubmit() {
    this.subscriptionService.createSubscription(this.subscription).subscribe({
      next: (response) => {
        console.log('Subscripción creada:', response);
        alert('¡Suscripción creada con éxito!');
        this.router.navigate(['/adminDashboard']);
      },
      error: (error) => {
        console.error('Error al crear la subscripción:', error);
        alert('Error al crear la suscripción. Inténtalo de nuevo más tarde.');
      },
    });
  }
}
