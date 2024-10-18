import { Component } from '@angular/core';
import { SubscripcionService } from '../../services/subscripcion.service'; // Ajusta la ruta según tu estructura
//subscription
@Component({
  selector: 'app-crear-suscripcion',
  templateUrl: './create-subscripcion.component.html',
  styleUrls: ['./create-subscripcion.component.css']
})

export class CreateSubscripcionComponent {
  subscripcion = {
    name: '',
    cantidadSem: 0
  };

  constructor(private subscripcionService: SubscripcionService) {}

  onSubmit() {
    this.subscripcionService.createSubscripcion(this.subscripcion)
      .subscribe({
        next: (response) => {
          console.log('Subscripción creada:', response);
          // Aquí puedes redirigir a otra página o mostrar un mensaje de éxito
        },
        error: (error) => {
          console.error('Error al crear la subscripción:', error);
          // Manejo de errores
        }
      });
  }
}
