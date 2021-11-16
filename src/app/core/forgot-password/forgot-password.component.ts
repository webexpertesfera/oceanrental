import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotPasswordRequest, NgAuthService } from '@appstrax/ng-auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordRequest: ForgotPasswordRequest = {
    email: ''
  };

  loading: boolean = false;
  error: string | null = null;

  user: any = null;

  constructor(
    private ngAuthService: NgAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.ngAuthService.getAuthenticatedUser();
    if (this.user) {
      this.router.navigate(['/bookings']);
      return;
    }
  }

  async sendRequest() {
    this.loading = true;
    this.error = null;

    try {
      localStorage.setItem('UserEmail', this.forgotPasswordRequest.email);
      const res = await this.ngAuthService.forgotPassword(this.forgotPasswordRequest);
      this.router.navigate(['auth/reset-password']);
    } catch (err) {
      this.error = 'Failed to send email, please try again or contact support.';
    }

    this.loading = false;
  }

  confirm(): boolean {
    if (!this.loading && this.forgotPasswordRequest.email) {
      return true;
    }
    return false;
  }

  dismissToSignup() {
    this.router.navigate(['auth/sign-up']);
  }

}
