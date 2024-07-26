import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { UserService } from './user.service';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; // Importa provideHttpClient

export const appConfig: ApplicationConfig = {
  providers: [
    UserService,
    provideHttpClient() // Añade provideHttpClient a los proveedores
  ]
};