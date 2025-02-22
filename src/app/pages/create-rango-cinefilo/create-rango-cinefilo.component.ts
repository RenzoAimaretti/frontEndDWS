
import { Component } from '@angular/core';
import { RangoCinefiloService } from '../../services/rangoCinefilo.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-rango-cinefilo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-rango-cinefilo.component.html',
  styleUrls: ['./create-rango-cinefilo.component.css'],
})
export class CreateRangoCinefiloComponent {
  rangoCinefilo: {
    nameRango: string;
    descriptionRango: string;
    minReviews: number | null;
  } = {
    nameRango: '',
    descriptionRango: '',
    minReviews: 0,
  };

  constructor(
    private rangoCinefiloService: RangoCinefiloService,
    public router: Router
  ) {}

  onSubmit() {
    if (!this.rangoCinefilo.nameRango.trim() || !this.rangoCinefilo.descriptionRango.trim()) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    this.rangoCinefiloService.createRangoCinefilo(this.rangoCinefilo).subscribe({
      next: (response) => {
        console.log('RangoCinefilo creado:', response);
        alert('¡Rango cinéfilo creado con éxito!');
        this.router.navigate(['/adminDashboard']);
      },
      error: (error) => {
        console.error('Error al crear RangoCinefilo:', error);
        alert('Error al crear el Rango cinéfilo. Inténtalo de nuevo más tarde.');
      },
    });
  }
}
