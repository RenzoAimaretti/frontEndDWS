import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RangoCinefiloService } from '../../services/rangoCinefilo.service'; 
import { RangoCinefilo } from '../../interface/rangoCinefilo'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-rangos',
  standalone: true,
  templateUrl: './show-rangos.component.html',
  styleUrls: ['./show-rangos.component.css'],
  imports: [CommonModule]
})
export class ShowRangosComponent implements OnInit {
  query!: string;
  resultados: RangoCinefilo[] = []; 

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private rangoCinefiloService: RangoCinefiloService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      this.buscarRangos(this.query);
    });
  }

  buscarRangos(query: string): void {
    this.rangoCinefiloService.searchRangoCinefilo(query).subscribe(result => {
    
      this.resultados = result; 
    });
  }

  editarRangoCinefilo(rangoCinefilo: RangoCinefilo): void {
   
    this.router.navigate(['/editar-rango-cinefilo', rangoCinefilo.id]);
  }

  eliminarRangoCinefilo(id: number | undefined): void {
    if (confirm('¿Estás seguro de que deseas eliminar este rango cinefilo?')) {
        this.rangoCinefiloService.deleteRangoCinefilo(id!).subscribe({
            next: (response) => {
                alert(response.message); 
                this.resultados = this.resultados.filter(rango => rango.id !== id);
            },
            error: (error: any) => {
                alert('Error al eliminar el rango cinefilo');
            }
        });
    }
}
}
