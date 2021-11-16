import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Breadcrumb } from '../models/breadcrumb.model';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  @Input() backPath = environment.home;

  @Input() breadcrumbs: Array<Breadcrumb> = [
    { path: '', label: 'Rentals', active: false, disabled: false },
  ];

  constructor() {}

  ngOnInit(): void {}

  back() {
    if (history.length === 0) {
      location.href = this.backPath;
      return;
    }

    history.back();
  }
}
