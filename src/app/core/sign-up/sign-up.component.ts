import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgAuthService, RegistrationRequest } from '@appstrax/ng-auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registrationRequest: RegistrationRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  passwordOne = '';
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

  async signup() {
    this.error = null;

    if (!this.isEmailValid(this.registrationRequest.email)) {
      this.error = 'Please enter a valid email address';
      return;
    }

    if (this.passwordOne !== this.registrationRequest.password) {
      this.error = 'Passwords need to match';
      return;
    }

    this.loading = true;

    try {
      this.registrationRequest.firstName = this.registrationRequest.email.split(
        '@'
      )[0];
      const user = await this.ngAuthService.register(this.registrationRequest);
      if (user.id) {
        this.router.navigate(['/bookings']);
      }
      // this.modal.close(user);
    } catch (err) {
      this.error = `Failed to register, make sure you have entered a valid email address.`;
    }

    this.loading = false;
  }

  dismissToLogin() {
    // this.modal.dismiss('login');
    this.router.navigate(['auth/login']);
  }

  valid() {
    return ((this.registrationRequest.email && this.registrationRequest.password) && (this.passwordOne === this.registrationRequest.password) && (!this.loading));
  }

  private isEmailValid(email: string) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return true;
    }

    return false;
  }

}
