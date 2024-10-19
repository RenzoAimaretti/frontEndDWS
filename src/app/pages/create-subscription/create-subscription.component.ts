import { Component } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-create-subscription',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './create-subscription.component.html',
  styleUrls: ['./create-subscription.component.css']
})
export class CreateSubscriptionComponent {
  subscription = {
    name: '',
    cantidadSem: 0
  };

  constructor(private subscriptionService: SubscriptionService) {}

  onSubmit() {
    this.subscriptionService.createSubscription(this.subscription).subscribe({
      next: (response) => {
        console.log('Subscripción creada:', response);
        alert('¡Suscripción creada con éxito!');
      },
      error: (error) => {
        console.error('Error al crear la subscripción:', error);
        alert('Error al crear la suscripción. Inténtalo de nuevo más tarde.');
      }
    });
  }
}
