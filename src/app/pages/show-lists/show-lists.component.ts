import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListService } from '../../services/list.service.js';
import { List } from '../../interface/list.js';
import { SearchComponent } from '../search/search.component.js';
import { TmdbService } from '../../services/tmdb-service.service.js';

@Component({
  selector: 'app-show-lists',
  templateUrl: './show-lists.component.html',
  styleUrls: ['./show-lists.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, SearchComponent, RouterModule],
})
export class ShowListsComponent implements OnInit {
  lists: List[] = [];
  query: string = '';

  constructor(
    private listService: ListService,
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['query']) {
        this.query = params['query'];
        this.searchLists();
      }
    });
  }

  searchLists(): void {
    if (this.query) {
      this.listService.searchLists(this.query).subscribe({
        next: (response) => {
          this.lists = response.map((list: List) => {
            return {
              ...list,
              contents: list.contents.map((content: any) => ({
                ...content,
                id: content.idContent,
              })),
            };
          });
          this.loadMoviesForLists();
        },
      });
    }
  }

  loadMoviesForLists(): void {
    for (const list of this.lists) {
      for (const content of list.contents) {
        if (content) {
          this.tmdbService.getMovie(content.id).subscribe({
            next: (response) => {
              content.title = response.title;
              content.poster_path = response.poster_path;
            },
            error: (err) => {
              console.error('Error obteniendo la película', err);
            },
          });
        } else {
          console.error(
            'ID de película no definido para este contenido:',
            content
          );
        }
      }
    }
  }

  getImageUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
}
