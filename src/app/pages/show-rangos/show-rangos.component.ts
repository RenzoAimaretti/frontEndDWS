// show-rangos.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RangoCinefiloService } from '../../services/rangoCinefilo.service'; 
import { RangoCinefilo } from '../../interface/rangoCinefilo'; 
import { CommonModule } from '@angular/common'
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

  constructor(private route: ActivatedRoute, private rangoCinefiloService: RangoCinefiloService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      this.buscarRangos(this.query);
    });
  }

  buscarRangos(query: string): void {
    this.rangoCinefiloService.searchRangoCinefilo(query).subscribe(result => {
      console.log('RangoCinefilo search resultados:', result);
      this.resultados = result; 
    });
  }
}
