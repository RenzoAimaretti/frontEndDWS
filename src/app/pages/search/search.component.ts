import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'] // Corregido a styleUrls
})
export class SearchComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  input = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.input = queryParams['query'];
    });
  }
  
  searchLists(): void {
    if (this.input) {
      console.log('searchLists called with input:', this.input);
      this.router.navigate(['/search/lists'], { queryParams: { query: this.input } });
    }
  }

  searchMovies(): void {
    if (this.input) {
      console.log('searchMovies called with input:', this.input);
      this.router.navigate(['/search/movies'], { queryParams: { query: this.input } });
    }
  }
}

