import { Component, OnInit } from '@angular/core';
import MercadoPago from 'mercadopago';
import { environment } from '../../../enviroments/enviroment';
import { MercadoPagoService } from '../../services/mercado-pago.service';
import { CommonModule } from '@angular/common';

declare global {
  interface Window {
    checkoutButton: any;
  }
}

@Component({
  selector: 'app-prueba-mp-checkout-pro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prueba-mp-checkout-pro.component.html',
  styleUrl: './prueba-mp-checkout-pro.component.css',
})
export class PruebaMpCheckoutProComponent implements OnInit {
  mp: any;
  mpUrl: string | null = null;
  constructor(private mercadoPagoService: MercadoPagoService) {
    this.mp = new MercadoPago({
      accessToken: environment.mercadoPagoPublicKey,
    });
  }

  ngOnInit(): void {
    this.cargarCheckout();
  }

  async cargarCheckout() {
    try {
      const orderData = {
        title: 'Premium',
        quantity: 1,
        unit_price: 100000,
      };
      //armamos la preferencia con la order data y nos devuelve la url de mercado pago
      const preference = await this.mercadoPagoService.createPreference(
        orderData
      );
      this.mpUrl = preference?.url || null;
      console.log(this.mpUrl);
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
