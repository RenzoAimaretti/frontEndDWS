import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListService } from '../../services/list.service.js';
import { List } from '../../interface/list.js';
import { find } from 'rxjs';

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

constructor(private listService: ListService) { }

selectedList?: List
alreadyInList: boolean = false;

  closeModal(): void {
    this.showModal = false;
    this.showModalChange.emit(this.showModal);
  }

  selectList(list: List): void {
    this.selectedList = list;  
    console.log('Lista seleccionada:', this.selectedList); 
  }
  

  addContent(): void {
    if (this.selectedList !== undefined) {
      if (!this.alreadyInList) {
        this.listService.addContent(this.movieId, this.selectedList.id, this.movieTitle).subscribe({
          next: (result) => {
            if (result.message === 'Content already in list') {
              alert('El contenido ya está en la lista');
            } else {
              alert('Contenido agregado');
              console.log('Contenido agregado:', result.data);
              this.closeModal();
            }
          },
          error: (error) => console.log(error)
        });
      } else {
        console.log('El contenido ya está en la lista');
      }
    } else {
      console.log('Selecciona una lista');
    }
  }
  
}
