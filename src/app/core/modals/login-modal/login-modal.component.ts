import { Component, OnInit } from '@angular/core';
import { AuthRequest, NgAuthService } from '@appstrax/ng-auth';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  authRequest: AuthRequest = {
    email: '',
    password: '',
  };
  loading: boolean = false;
  error: string | null = null;

  constructor(
    public modal: NgbActiveModal,
    private ngAuthService: NgAuthService
  ) { }
  ngOnInit(): void { }

  async login() {
    this.loading = true;
    this.error = null;

    try {
      const user = await this.ngAuthService.login(this.authRequest);
      this.modal.close(user);
    } catch (err) {
      this.error = 'Failed to login, please try again or contact support.';
    }

    this.loading = false;
  }

  dismissToSignup() {
    this.modal.dismiss('signup');
  }
}
