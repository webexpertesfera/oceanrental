import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './services/auth.guard';
// import { UnAuthGuard } from './services/un-auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
    //canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/core.module').then((mod) => mod.CoreModule),
    //canActivate: [UnAuthGuard],
  },
  {
    path: 'bookings',
    loadChildren: () =>
      import('./booking/booking.module').then((mod) => mod.BookingModule),
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('./payment/payment.module').then((mod) => mod.PaymentModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./product/product.module').then((mod) => mod.ProductModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
