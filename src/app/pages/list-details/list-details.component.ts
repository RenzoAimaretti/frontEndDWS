import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ListService } from '../../services/list.service.js';
import { List } from '../../interface/list.js';

@Component({
  selector: 'app-list-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-details.component.html',
  styleUrl: './list-details.component.css'
})
export class ListDetailsComponent {
  route:ActivatedRoute=inject(ActivatedRoute);
  listId=-1;
  list: List|null= null;

  constructor(private listService: ListService) {
    this.route.params.subscribe(params => {
    this.listId = params['id'];
  });
}

async ngOnInit(): Promise<void> {
  
  await this.getList();
}
async getList():Promise<void>{
  this.listService.getList(this.listId).subscribe({
    next: (result) => {console.log(result), this.list = result},
    error: (error) => console.log(error)
  });
}
}
