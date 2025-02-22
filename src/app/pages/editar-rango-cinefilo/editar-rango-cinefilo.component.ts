import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RangoCinefiloService } from '../../services/rangoCinefilo.service.js';
import { RangoCinefilo } from '../../interface/rangoCinefilo.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-rango-cinefilo',
  standalone: true,
  templateUrl: './editar-rango-cinefilo.component.html',
  styleUrls: ['./editar-rango-cinefilo.component.css'],
  imports: [CommonModule, FormsModule],
})
export class EditarRangoCinefiloComponent implements OnInit {
  rangoCinefilo!: RangoCinefilo;

  constructor(
    private rangoCinefiloService: RangoCinefiloService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.rangoCinefiloService.getRangoCinefiloById(id).subscribe(
        (data) => {
          this.rangoCinefilo = data;
        },
        (error) => {
          console.error('Error al obtener el rango cinefilo:', error);
          this.router.navigate(['/search/rangoCinefilo']);
        }
      );
    } else {
      console.error('ID de rango cinefilo no válido');
      this.router.navigate(['/search/rangoCinefilo']);
    }
  }

  guardarCambios(): void {
    if (this.rangoCinefilo && this.rangoCinefilo.id) {
      this.rangoCinefiloService
        .editRangoCinefilo(this.rangoCinefilo.id, this.rangoCinefilo)
        .subscribe(() => {
          alert('Rango cinefilo editado correctamente.');
          this.router.navigate(['/adminDashboard']);
        });
    } else {
      console.error('ID de rango cinefilo no disponible');
    }
  }
}
