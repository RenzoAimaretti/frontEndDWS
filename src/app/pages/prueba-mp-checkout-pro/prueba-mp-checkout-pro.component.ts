import { Component, OnInit } from '@angular/core';
import MercadoPago from 'mercadopago';
import { environment } from '../../../enviroments/enviroment';
import { MercadoPagoService } from '../../services/mercado-pago.service';

declare global {
  interface Window {
    checkoutButton: any;
  }
}

@Component({
  selector: 'app-prueba-mp-checkout-pro',
  standalone: true,
  imports: [],
  templateUrl: './prueba-mp-checkout-pro.component.html',
  styleUrl: './prueba-mp-checkout-pro.component.css',
})
export class PruebaMpCheckoutProComponent implements OnInit {
  mp: any;
  constructor(private mercadoPagoService: MercadoPagoService) {
    this.mp = new MercadoPago({
      accessToken: environment.mercadoPagoPublicKey,
    });
  }

  ngOnInit(): void {
    try {
      const checkoutBtn = document.getElementById('checkout-btn');
      if (checkoutBtn) {
        console.log('tenemos boton');
        checkoutBtn.addEventListener('click', async () => {
          const orderData = {
            title: 'Mi producto',
            quantity: 1,
            unit_price: 100,
          };
          const response = await this.mercadoPagoService.createPreference(
            orderData
          );
          console.log(response);
          this.createCheckoutButton(response);
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  createCheckoutButton(response: any) {
    // Initialize the checkout
    const bricksBuilder = this.mp.bricks();
    // por alguna razon no renderiza el boton de pago
    const renderComponent = async (bricksBuilder: any) => {
      if (window.checkoutButton) window.checkoutButton.unmount();
      await bricksBuilder.create(
        'wallet',
        'button-checkout', // class/id where the payment button will be displayed
        {
          initialization: {
            preferenceId: response.id,
          },
          callbacks: {
            onError: (error: any) => console.error(error),
            onReady: () => {},
          },
        }
      );
    };
    window.checkoutButton = renderComponent(bricksBuilder);
  }
}
