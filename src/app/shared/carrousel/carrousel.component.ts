import {
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Input,
  ElementRef,
} from '@angular/core';
import { Movie } from '../../interface/movie.js';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrousel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css'],
})
export class CarrouselComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() movies: Movie[] = [];
  @Input() title: string = '';
  @Input() idCarrusel: string = '';
  @ViewChild('carousel') carousel!: ElementRef;
  private intervalId: any;
  private scrollStep = 1;
  private scrollAmount = 180;
  private autoScrollInterval: any;
  private timeoutId: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (!this.idCarrusel) {
      console.error('Carousel id is required');
    }
  }

  ngAfterViewInit(): void {
    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      cancelAnimationFrame(this.intervalId);
    }
  }

  startAutoScroll(): void {
    const scroll = () => {
      const carouselElement = this.elementRef.nativeElement.querySelector(
        '.carousel-' + this.idCarrusel
      );
      if (carouselElement) {
        carouselElement.scrollLeft += this.scrollStep;
        if (
          carouselElement.scrollLeft >=
            carouselElement.scrollWidth - carouselElement.clientWidth ||
          carouselElement.scrollLeft <= 0
        ) {
          carouselElement.scrollLeft = 0;
        }
      }
      this.intervalId = requestAnimationFrame(scroll);
    };
    this.intervalId = requestAnimationFrame(scroll);
  }

  stopAutoScroll(): void {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
    if (this.intervalId) {
      cancelAnimationFrame(this.intervalId);
      this.intervalId = null;
    }
  }

  smoothScroll(carouselElement: HTMLElement): void {
    const scroll = () => {
      carouselElement.scrollLeft += this.scrollStep;
      if (
        carouselElement.scrollLeft >=
        carouselElement.scrollWidth - carouselElement.clientWidth
      ) {
        carouselElement.scrollLeft = 0;
      } else if (carouselElement.scrollLeft <= 0) {
        carouselElement.scrollLeft =
          carouselElement.scrollWidth - carouselElement.clientWidth;
      }
      this.intervalId = requestAnimationFrame(scroll);
    };
    this.intervalId = requestAnimationFrame(scroll);
  }

  scrollLeft(): void {
    this.stopAutoScroll();
    const carouselElement = this.elementRef.nativeElement.querySelector(
      '.carousel-' + this.idCarrusel
    ) as HTMLElement;
    if (carouselElement) {
      if (carouselElement.scrollLeft === 0) {
        carouselElement.scrollTo({
          left: carouselElement.scrollWidth,
          behavior: 'smooth',
        });
      } else {
        carouselElement.scrollBy({
          left: -this.scrollAmount,
          behavior: 'smooth',
        });
      }
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId); // Cancelar cualquier timeout existente
    }
    this.timeoutId = setTimeout(() => this.startAutoScroll(), 2000); // Reanudar autoscroll después de 2 segundos
  }

  scrollRight(): void {
    this.stopAutoScroll();
    const carouselElement = this.elementRef.nativeElement.querySelector(
      '.carousel-' + this.idCarrusel
    ) as HTMLElement;
    if (carouselElement) {
      if (carouselElement.scrollLeft === carouselElement.scrollWidth) {
        carouselElement.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carouselElement.scrollBy({
          left: this.scrollAmount,
          behavior: 'smooth',
        });
      }
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId); // Cancelar cualquier timeout existente
    }
    this.timeoutId = setTimeout(() => this.startAutoScroll(), 2000); // Reanudar autoscroll después de 2 segundos
  }

  getImageUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
}
