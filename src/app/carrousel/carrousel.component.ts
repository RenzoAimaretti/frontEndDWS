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
  private itemWidth = 160; // Ancho del ítem del carrusel, incluyendo margen
  private scrollAmount = 0;

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
      scrollAmount += 150; 

      if (scrollAmount >= carousel.scrollWidth) {
        scrollAmount = 0; 
        carousel.scrollLeft = 0; 
      }

      carousel.scrollLeft = scrollAmount;
    
    }, scrollSpeed);
  }
}
