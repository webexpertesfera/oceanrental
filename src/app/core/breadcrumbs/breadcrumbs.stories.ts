import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata } from '@storybook/angular';

import { BreadcrumbsComponent } from './breadcrumbs.component';

export default {
  title: 'Core/Breadcrumbs',
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, RouterTestingModule],
    }),
  ],
};

export const productBreadcrumbs = () => ({
  component: BreadcrumbsComponent,
  props: {
    breadcrumbs: [
      { path: '/', label: 'Rentals', active: false, disabled: false },
      { path: '/', label: 'Jetski', active: false, disabled: false },
      { path: '/', label: 'SeaDoo GTR x 230', active: true, disabled: false },
    ],
  },
});

export const checkoutBreadcrumbs = () => ({
  component: BreadcrumbsComponent,
  props: {
    breadcrumbs: [
      { path: '/', label: 'My Booking', active: false, disabled: false },
      { path: '/', label: 'Checkout', active: true, disabled: false },
      { path: '/', label: 'Payment', active: false, disabled: true },
    ],
  },
});

export const paymentBreadcrumbs = () => ({
  component: BreadcrumbsComponent,
  props: {
    breadcrumbs: [
      { path: '/', label: 'My Booking', active: false, disabled: false },
      { path: '/', label: 'Checkout', active: false, disabled: false },
      { path: '/', label: 'Payment', active: true, disabled: false },
    ],
  },
});
