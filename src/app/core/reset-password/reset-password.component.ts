import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgAuthService, ResetPasswordRequest } from '@appstrax/ng-auth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordRequest: ResetPasswordRequest = {
    resetCode: '',
    email: '',
    newPassword: ''
  };

  confirmPassword: string = '';
  password: string = '';

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

  async resetPassword() {
    this.loading = true;
    this.error = null;

    try {
      const res = await this.ngAuthService.resetPassword(this.resetPasswordRequest);
      this.router.navigate(['auth/login']);
    } catch (err) {
      this.error = 'Failed to send email, please try again or contact support.';
    }

    localStorage.removeItem('UserEmail');
    this.loading = false;
  }

  confirm(): boolean {
    if ((this.confirmPassword && this.password) && (this.confirmPassword === this.password) && (this.resetPasswordRequest.resetCode)) {
      this.resetPasswordRequest.newPassword = this.password;
      this.resetPasswordRequest.email = localStorage.getItem('UserEmail') || '';
      return true;
    }
    return false;
  }

  dismissToSignup() {
    this.router.navigate(['auth/sign-up']);
  }

}
