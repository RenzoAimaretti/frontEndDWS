import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);

  if (req.url.indexOf('home') > 0) return next(req);

  const authToken = cookieService.get('access_token');
  const authAdminToken = cookieService.get('access_admin_token');
  if (authToken != '') {
    const clonReq = req.clone({
      setHeaders: {
        authorization: authToken,
      },
    });
    return next(clonReq);
  } else if (authAdminToken != '') {
    const clonReq = req.clone({
      setHeaders: {
        authorization: authAdminToken,
      },
    });
    return next(clonReq);
  }

  return next(req);
};
