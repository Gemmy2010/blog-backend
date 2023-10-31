import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);
  const router = inject(Router);

  if (authService.isLoggedInGuard) {
    console.log('Access granted');

    return true;
  } else {
    toastr.warning('You dont have permission to access this page...!');
    router.navigate(['/login']);

    return false;
  }
};
