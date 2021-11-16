import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgAuthService } from '@appstrax/ng-auth';
import { UserService } from 'src/app/core/services/user.service';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Array<any> = [];
  user: any = null;

  editing: any = {};
  rows: any = [];

  ColumnMode = ColumnMode;

  updatedRow: any = null;

  roleMap: { [key: string]: string } = {
    admin: 'admin',
    employee: 'Employee',
    disabled: 'Disabled',
  };


  constructor(
    private userService: UserService,
    private ngAuth: NgAuthService,
    private router: Router,

  ) { }

  async ngOnInit() {
    this.user = this.ngAuth.getAuthenticatedUser();
    if (!this.user) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.users = (await this.userService.getUsers()).sort(function (
      a: any,
      b: any
    ) {
      return a.firstName.localeCompare(b.firstName);
    });
    this.refreshUsers();
  }

  async refreshUsers() {
    const users = await this.userService.getUsers();
    this.rows = [...users];
  }

  async updateValue(event: any, cell: any, rowIndex: any) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;

    await this.userService.putUsers(this.rows[rowIndex]);

    this.rows = [...this.rows];

    this.updatedRow = this.rows[rowIndex];
    setTimeout(() => {
      this.updatedRow = null;
    }, 2000);
  }

}
