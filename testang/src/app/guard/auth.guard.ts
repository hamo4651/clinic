import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const isAuthenticated = !!localStorage.getItem('token');
  if (isAuthenticated) {
    return true; // Allow access
  } else {
    const router = inject(Router); // Use `inject` to access services
    return router.parseUrl('/login'); // Redirect to login
  }


};
