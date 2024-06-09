import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Ban khong co quyen truy cap');
    router.navigate(['/signin']);
    return false;
  }
  return true;
};
