import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PinAccessService } from '../services/pin-access.service';

export const pinGuard: CanActivateFn = () => {
  const pinAccessService = inject(PinAccessService);
  const router = inject(Router);

  if (pinAccessService.tieneAcceso()) {
    return true;
  }

  return router.parseUrl('/home');
};
