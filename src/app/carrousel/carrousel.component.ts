import { Component,Input } from '@angular/core';
import { Movie } from '../movie';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-carrousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrousel.component.html',
  styleUrl: './carrousel.component.css'
})
export class CarrouselComponent {
  @Input() movies: Movie[]=[];
  @Input() title: string='';
  constructor() { }
  ngOnInit(): void {
  }

  getImageUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`; // Ajusta el tamaño de la imagen según tus necesidades (w500, w200, etc.)
  }

}
