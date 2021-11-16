import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UnAuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (
      isPlatformBrowser(this.platformId) &&
      this.authService.isAuthenticated()
    ) {
      this.router.navigate(['bookings']);
      return false;
    }
    return true;
  }
}
