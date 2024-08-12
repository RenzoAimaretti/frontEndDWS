import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';

import {ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  route:ActivatedRoute=inject(ActivatedRoute);
  input=''
  async ngOnInit():Promise<void>{
    this.route.queryParams.subscribe(queryParams =>{
      this.input = queryParams['title']
    })
    
  }
}


