import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {

  const isAuthenticated = !!localStorage.getItem('token');
  if (isAuthenticated) {
    const router = inject(Router); // Use `inject` to access services
    return router.parseUrl('/profile');    
  }
  return true;
};
