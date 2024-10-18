import { ApplicationConfig,  importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { UserService } from './services/user.service';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Importa provideHttpClient
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { authInterceptor } from './custom/auth.interceptor';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    UserService,
    provideRouter(routes),
    provideProtractorTestingSupport(),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(FormsModule),
  ]
};