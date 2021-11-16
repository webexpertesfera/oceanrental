import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { CheckAvailComponent } from './pages/check-avail/check-avail.component';
import { TransportCostsComponent } from './pages/transport-costs/transport-costs.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'check-availability',
        component: CheckAvailComponent,
      },
      {
        path: 'transport-costs',
        component: TransportCostsComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
