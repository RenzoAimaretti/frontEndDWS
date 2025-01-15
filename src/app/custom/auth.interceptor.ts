import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);

  if (req.url.includes('home')) {
    return next(req);
  }

  const authToken = cookieService.get('access_token');
  const authAdminToken = cookieService.get('access_admin_token');
  //Correccion de logica de manejo de tokens correspondiente a Middle issue
  const token = authToken || authAdminToken;
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        authorization: token,
      },
    });
    return next(clonedRequest);
  }

  return next(req);
};
