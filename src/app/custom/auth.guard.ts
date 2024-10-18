import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authToken = cookieService.get('access_token') || '';
  const authAdminToken = cookieService.get('access_admin_token') || '';
  const router = inject(Router);

  if (authToken != '') {
    return true;
  } else if (authAdminToken != '') {
    //sera asi el guard de admin? o tengo que hacer otro propio para el dashboard de admin??
    return true;
  } else {
    const url = router.createUrlTree(['/login']);
    return url;
  }
};
