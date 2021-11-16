import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequest, NgAuthService } from '@appstrax/ng-auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authRequest: AuthRequest = {
    email: '',
    password: '',
  };
  loading: boolean = false;
  error: string | null = null;

  user: any = null;

  constructor(
    private ngAuthService: NgAuthService,
    private router: Router,
    // @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit(): void {
    // if (isPlatformServer(this.platformId)) return;
    this.user = this.ngAuthService.getAuthenticatedUser();
    if (this.user) {
      this.router.navigate(['/bookings']);
      return;
    }
  }

  async login() {
    this.loading = true;
    this.error = null;

    try {
      const user = await this.ngAuthService.login(this.authRequest);
      if (user.id) {
        history.back();
      }
    } catch (err) {
      this.error = 'Failed to login, please try again or contact support.';
    }

    this.loading = false;
  }

  dismissToSignup() {
    this.router.navigate(['auth/sign-up']);
  }
}
