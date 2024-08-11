import { Component, Input, AfterViewInit } from '@angular/core';
import { Movie } from '../../interface/movie';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { TmdbService } from '../../services/tmdb-service.service';
@Component({
  selector: 'app-carrousel-spotlight',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrousel-spotlight.component.html',
  styleUrls: ['./carrousel-spotlight.component.css']
})
export class CarrouselSpotlightComponent implements AfterViewInit {
  @Input() movies: Movie[] = [];

  constructor(private tmdbService: TmdbService) { }

  ngAfterViewInit() {
    const myCarouselElement = document.querySelector('#spotlight') as HTMLElement;
    if (myCarouselElement) {
      new bootstrap.Carousel(myCarouselElement, {
        interval: 5000,
        touch: false
      });
    }
  }

  getBackdropUrl(path: string): string {
    return this.tmdbService.getBackdropUrl(path);
  }
}