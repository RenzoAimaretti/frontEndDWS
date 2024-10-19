import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ListService } from '../../services/list.service';
import { List } from '../../interface/list';
import { SearchComponent } from '../search/search.component'; 

@Component({
  selector: 'app-show-lists',
  templateUrl: './show-lists.component.html',
  styleUrls: ['./show-lists.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, SearchComponent, RouterModule]
})
export class ShowListsComponent implements OnInit {
  lists: List[] = [];
  query: string = '';

  constructor(private listService: ListService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {
      if (params['query']) {
        this.query = params['query'];
        this.searchLists();
      }
    });
  }

  async searchLists(): Promise<void> {
    if (this.query) {
      this.listService.searchLists(this.query).subscribe(lists => {
        this.lists = lists;
      });
    }
  }
}
