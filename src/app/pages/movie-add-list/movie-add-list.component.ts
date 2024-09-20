import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-add-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './movie-add-list.component.html',
  styleUrl: './movie-add-list.component.css'
})
export class MovieAddListComponent {
@Input() movieId: number = -1;

@Input() movieTitle: string = '';

@Input() showModal: boolean = false;

@Input() lists: any[] = [];

@Output() showModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();



  closeModal(): void {
    this.showModal = false;
    this.showModalChange.emit(this.showModal);
  }
}
