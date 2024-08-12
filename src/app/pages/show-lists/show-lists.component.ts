import { Component, inject, Input} from '@angular/core';
import { SearchComponent } from '../search/search.component.js';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-lists',
  standalone: true,
  imports: [SearchComponent,CommonModule],
  templateUrl: './show-lists.component.html',
  styleUrl: './show-lists.component.css'
})
export class ShowListsComponent {
  route:ActivatedRoute=inject(ActivatedRoute);
  input=''
  async ngOnInit():Promise<void>{
    this.route.queryParams.subscribe(queryParams =>{
      this.input = queryParams['title']
      console.log(this.input)
    })

}
}
