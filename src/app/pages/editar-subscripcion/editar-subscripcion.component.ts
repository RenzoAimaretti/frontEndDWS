import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from '../../services/subscription.service';
import { Subscription } from '../../interface/subscription';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-subscripcion',
  standalone: true,
  templateUrl: './editar-subscripcion.component.html',
  styleUrls: ['./editar-subscripcion.component.css'],
  imports: [CommonModule, FormsModule]
})
export class EditarSubscripcionComponent implements OnInit {
  subscription!: Subscription;

  constructor(
    private subscriptionService: SubscriptionService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.subscriptionService.getSubscriptionById(id).subscribe(
        (data) => {
          this.subscription = data; 
        },
        (error) => {
          console.error('Error al obtener la subscripción:', error);
          this.router.navigate(['/search/subscriptions']); 
        }
      );
    } else {
      console.error('ID de subscripción no válido');
      this.router.navigate(['/search/subscriptions']);
    }
  }

  guardarCambios(): void {
    if (this.subscription && this.subscription.id) { 
      this.subscriptionService.editSubscription(this.subscription.id, this.subscription).subscribe(() => {
        alert('subscripcion editada correctamente.'); 
        this.router.navigate(['/adminDashboard']);  
      });
    } else {
      console.error('ID de subscripción no disponible');
      this.router.navigate(['/search/subscriptions']);
    }
  }
}