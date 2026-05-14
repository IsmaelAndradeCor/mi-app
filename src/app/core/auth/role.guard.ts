import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['roles'] as string[] | undefined;

  if (!authService.isAuthenticated()) {
    return router.parseUrl('/login');
  }

  if (!expectedRoles || expectedRoles.length === 0) {
    return true;
  }

  const hasAccess = expectedRoles.some(role => authService.hasRole(role));

  if (hasAccess) {
    return true;
  }

  return router.parseUrl('/home');
};