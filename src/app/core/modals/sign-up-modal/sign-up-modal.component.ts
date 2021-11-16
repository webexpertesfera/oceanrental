import { Component, OnInit } from '@angular/core';
import { NgAuthService, RegistrationRequest } from '@appstrax/ng-auth';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.scss'],
})
export class SignUpModalComponent implements OnInit {
  registrationRequest: RegistrationRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  passwordOne = '';
  loading: boolean = false;
  error: string | null = null;

  constructor(
    public modal: NgbActiveModal,
    private ngAuthService: NgAuthService
  ) { }

  ngOnInit(): void { }

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
      this.modal.close(user);
    } catch (err) {
      this.error = `Failed to register, make sure you have entered a valid email address.`;
    }

    this.loading = false;
  }

  dismissToLogin() {
    this.modal.dismiss('login');
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
