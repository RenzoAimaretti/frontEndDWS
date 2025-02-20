import { Component } from '@angular/core';
import { RangoCinefiloService } from '../../services/rangoCinefilo.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-rango-cinefilo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-rango-cinefilo.component.html',
  styleUrls: ['./create-rango-cinefilo.component.css'],
})
export class CreateRangoCinefiloComponent {
  rangoCinefilo = {
    nameRango: '',
    descriptionRango: '',
    minReviews: null, // Se inicializa en null para que el usuario lo ingrese
  };

  constructor(
    private rangoCinefiloService: RangoCinefiloService,
    private router: Router
  ) {}

  onSubmit() {
    this.rangoCinefiloService
      .createRangoCinefilo(this.rangoCinefilo)
      .subscribe({
        next: (response) => {
          console.log('RangoCinefilo creado:', response);
          alert('¡Rango cinefilo creado con éxito!');
          this.router.navigate(['/adminDashboard']);
        },
        error: (error) => {
          console.error('Error al crear RangoCinefilo:', error);
          alert(
            'Error al crear el Rango cinefilo. Inténtalo de nuevo más tarde.'
          );
        },
      });
  }
}
