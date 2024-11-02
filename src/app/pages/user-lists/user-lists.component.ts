import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service.js';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { List } from '../../interface/list.js';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb-service.service.js';
import { AuthService } from '../../services/auth.service.js';

@Component({
  selector: 'app-user-lists',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-lists.component.html',
  styleUrl: './user-lists.component.css',
})
export class UserListsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  userId?: number;
  lists: List[] = [];
  idCurrent?: number;

  constructor(
    private userServices: UserService,
    private tmdbService: TmdbService,
    private authService: AuthService
  ) {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
  }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['refresh'] === 'true') {
        this.userLists();
      }
    });

    this.authService.getIdFromToken();
    this.authService.currentUser().subscribe({
      next: (response) => {
        this.idCurrent = response;
        if (this.idCurrent == this.userId) {
          this.userLists();
        } else {
          window.alert('No puedes ver las listas de otro usuario');
        }
      },
    });
  }

  userLists(): void {
    if (this.userId !== undefined) {
      this.userServices.userLists(this.userId).subscribe({
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

          if (this.lists.length !== 0) {
          } else {
            console.log('no hay listas');
          }
          this.loadMoviesForLists();
        },
        error: (err) => {
          console.error('Error obteniendo las listas', err);
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
