import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const permissionGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedPermissions = route.data['permissions'] as string[] | undefined;

  if (!authService.isAuthenticated()) {
    return router.parseUrl('/login');
  }

  // if (authService.hasRole('Administrador')) {
  //   return true;
  // }

  if (!expectedPermissions || expectedPermissions.length === 0) {
    return true;
  }

  const hasAccess = expectedPermissions.some(permission =>
    authService.hasPermission(permission)
  );

  return hasAccess ? true : router.parseUrl('/sin-acceso');
};