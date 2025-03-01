import { Component } from '@angular/core';
import { Suggestion } from '../../interface/suggestion.js';
import { SuggestionsService } from '../../services/suggestions.service.js';
import { AuthService } from '../../services/auth.service.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suggestions-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './suggestions-manager.component.html',
  styleUrl: './suggestions-manager.component.css',
})
export class SuggestionsManagerComponent {
  suggestions: Suggestion[] = [];
  admin?: number;
  //TRASLADAR A UNA COMPONENTE NUEVA ASI NO SE REPITEN LOS COMENTARIOS PARA CADA SUGERENCIA
  //SIMILAR A REVIEW Y COMMENTS
  adminComment: string = '';
  suggestionIndex: number | null = null;
  constructor(
    private suggestionsService: SuggestionsService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authService.getAdminIdFromToken();
    this.authService.isAdminLoggedIn().subscribe({
      next: (isLoggedIn) => {
        if (isLoggedIn) {
          this.authService.currentAdmin().subscribe({
            next: (response) => {
              this.admin = response;
            },
          });
        }
      },
    });

    this.getSuggestions();
    this.authService.currentAdminId.subscribe((id) => (this.admin = id));
  }

  startEditingSuggestion(index: number): void {
    this.suggestionIndex = index;
    console.log(this.suggestions[index].comentarioAdmin);
    this.adminComment = this.suggestions[index].comentarioAdmin || '';
  }

  getSuggestions(): void {
    this.suggestionsService.getSuggestions().subscribe((data: Suggestion[]) => {
      this.suggestions = data;
    });
  }

  acceptSuggestion(
    idSuggestion: number,
    suggestionToEdit: { admin: Number; comentarioAdmin: string; estado: string }
  ): void {
    console.log(suggestionToEdit);
    suggestionToEdit.estado = 'aceptado';
    this.suggestionsService
      .reviseSuggestion(idSuggestion, suggestionToEdit)
      .subscribe(() => this.getSuggestions());
  }

  rejectSuggestion(
    idSuggestion: number,
    suggestionToEdit: { admin: Number; comentarioAdmin: string; estado: string }
  ): void {
    suggestionToEdit.estado = 'rechazado';
    this.suggestionsService
      .reviseSuggestion(idSuggestion, suggestionToEdit)
      .subscribe(() => this.getSuggestions());
  }
  deleteSuggestion(idSuggestion: number): void {
    this.suggestionsService.deleteSuggestion(idSuggestion).subscribe(() => {
      this.getSuggestions();
    });
  }
}
