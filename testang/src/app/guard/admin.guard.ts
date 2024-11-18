import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {

  const userRole = localStorage.getItem('role');
  if (userRole === 'admin') {
  return true;}
  else{
  const router = inject(Router); 
  router.navigate(['/notauthorized']);
  return false;}
};
