import { Component } from '@angular/core';
import { RangoCinefiloService } from '../../services/rangoCinefilo.service';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-create-rango-cinefilo',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './create-rango-cinefilo.component.html',
  styleUrls: ['./create-rango-cinefilo.component.css'] 
})
export class CreateRangoCinefiloComponent {
  rangoCinefilo = {
    nameRango: '',
    descriptionRango: ''
  };

  constructor(private rangoCinefiloService: RangoCinefiloService) {}

  onSubmit() {
    this.rangoCinefiloService.createRangoCinefilo(this.rangoCinefilo).subscribe({
      next: (response) => {
        console.log('RangoCinefilo creado:', response);
        
      },
      error: (error) => {
        console.error('Error al crear RangoCinefilo:', error);
        
      }
    });
  }
}
