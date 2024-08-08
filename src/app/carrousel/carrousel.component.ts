import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit, OnDestroy {
  @Input() movies: Movie[] = [];
  @Input() title: string = '';
  private intervalId: any;

  constructor() { }

  ngOnInit(): void {
    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getImageUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  startAutoScroll(): void {
    const scrollSpeed = 5000; // Tiempo en milisegundos para cambiar la diapositiva
    const carousel = document.querySelector('.carousel') as HTMLElement;
    let scrollAmount = 0;

    this.intervalId = setInterval(() => {
      scrollAmount += 150; // Desplazar la cantidad de un ítem

      if (scrollAmount >= carousel.scrollWidth) {
        scrollAmount = 0; // Reiniciar al principio
        carousel.scrollLeft = 0; // Reiniciar la posición de desplazamiento
      }

      carousel.scrollLeft = scrollAmount;
    }, scrollSpeed);
  }
}
