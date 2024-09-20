import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-movie-add-list',
  standalone: true,
  imports: [],
  templateUrl: './movie-add-list.component.html',
  styleUrl: './movie-add-list.component.css'
})
export class MovieAddListComponent {
constructor(private cdr: ChangeDetectorRef) {}
@Input() movieId: number = -1;

@Input() movieTitle?: string

@Input() showModal: boolean = false;

@Output() showModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

ngOnInit() {
  console.log('movieTitle en modal:', this.movieTitle);
  this.cdr.detectChanges();
}

  closeModal(): void {
    this.showModal = false;
    this.showModalChange.emit(this.showModal);
  }
}
