import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NgAuthService, NgUser } from '@appstrax/ng-auth';
import { User } from '../booking/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user!: User;
  private ngUser!: NgUser;

  constructor(
    private ngAuth: NgAuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId) && this.isAuthenticated()) {
      this.ngUser = this.ngAuth.getAuthenticatedUser();
      this.user = User.fromNgUser(this.ngUser);
    }
  }

  isAuthenticated(): boolean {
    if (isPlatformServer(this.platformId)) return true;
    return this.ngAuth.isAuthenticated();
  }
}
