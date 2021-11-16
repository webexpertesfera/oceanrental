import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgAuthService } from '@appstrax/ng-auth';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit {
  user: any = null;

  constructor(
    private ngAuth: NgAuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) return;
    this.user = this.ngAuth.getAuthenticatedUser();
  }

  logout() {
    this.ngAuth.logout();
  }
}
