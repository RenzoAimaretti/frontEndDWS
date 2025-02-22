import { Component, Input } from '@angular/core';
import { MercadoPagoService } from '../../services/mercado-pago.service.js';
import { Subscription } from '../../interface/subscription.js';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service.js';
import { AuthService } from '../../services/auth.service.js';

@Component({
  selector: 'app-subscription-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-item.component.html',
  styleUrl: './subscription-item.component.css',
})
export class SubscriptionItemComponent {
  mp: any;
  mpUrl: string | null = null;

  @Input() suscriptionInput!: Subscription;

  currentSubscription?: Subscription;

  constructor(
    private mercadoPagoService: MercadoPagoService,
    private userService: UserService,
    private authService: AuthService
  ) {
    //usamos una pequeña reversion de la funcion de dashboard para obtener la subscripcion actual del usuario
    this.authService.getIdFromToken();
    this.authService.isUserLoggedIn().subscribe({
      next: (response) => {
        this.authService.currentUser().subscribe({
          next: (response) => {
            this.userService.getUser(response).subscribe({
              next: (Response) => {
                this.currentSubscription = Response.subscription;
              },
            });
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
  }

  ngOnInit(): void {
    this.cargarCheckout();
  }

  cargarCheckout() {
    try {
      const orderData = {
        title: this.suscriptionInput.name,
        quantity: 1,
        unit_price: this.suscriptionInput.precio,
      };
      //armamos la preferencia con la order data y nos devuelve la url de mercado pago
      this.mercadoPagoService.createPreference(orderData)?.subscribe({
        next: (result: any) => {
          this.mpUrl = result.url;
        },
        error: (e) => {
          console.log(e);
        },
      });
      // console.log(this.mpUrl);
    } catch (e) {
      console.log(e);
    }
  }

  redirectToMpUrl() {
    if (this.mpUrl) {
      window.location.href = this.mpUrl;
    }
  }
}
