import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const doctorGuard: CanActivateFn = (route, state) => {

  const userRole = localStorage.getItem('role');
  if (userRole === 'doctor') {
  return true;}
  else{
  const router = inject(Router); 
  router.navigate(['/notauthorized']);
  return false;
  }
};
