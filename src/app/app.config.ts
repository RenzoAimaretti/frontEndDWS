import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { UserService } from './services/user.service';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Importa provideHttpClient
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { authInterceptor } from './custom/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    UserService,
    provideRouter(routes),
    provideProtractorTestingSupport(),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};