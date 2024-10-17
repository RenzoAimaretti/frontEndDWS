import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Suggestion } from '../../interface/suggestion';
import { SuggestionsService } from '../../services/suggestions.service';

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css',
})
export class SuggestionsComponent {
  suggesionsList: Suggestion[] = [];

  constructor(
    private suggestionsService: SuggestionsService,
    private formBuilder: FormBuilder
  ) {}

  suggestionForm = this.formBuilder.group({
    titleSuggestion: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getSuggestions();
  }

  get titleSuggestion() {
    return this.suggestionForm.get('titleSuggestion');
  }

  get description() {
    return this.suggestionForm.get('description');
  }

  getSuggestions() {
    this.suggestionsService.getSuggestions().subscribe({
      next: (response) => {
        this.suggesionsList = response;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }

  postSuggestion() {
    if (this.suggestionForm.valid) {
      this.suggestionsService
        .postSuggestion(this.suggestionForm.value as Suggestion)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.getSuggestions();
            this.suggestionForm.reset();
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            console.log('Complete');
          },
        });
    } else {
      this.suggestionForm.markAllAsTouched();
      console.log('Formulario no válido');
    }
  }
}
