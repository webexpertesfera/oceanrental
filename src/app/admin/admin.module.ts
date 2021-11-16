import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';

import { AdminRoutingModule } from './admin-routing.module';
import { CoreModule } from '../core/core.module';
import { TransportCostsComponent } from './pages/transport-costs/transport-costs.component';
import { AdminHeaderComponent } from './components/header/admin-header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UsersComponent } from './pages/users/users.component';
import { CheckAvailComponent } from './pages/check-avail/check-avail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TransportCostsComponent,
    AdminHeaderComponent,
    LayoutComponent,
    UsersComponent,
    CheckAvailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    CoreModule,
    NgxDatatableModule,
    NgbModule,
    NgxBootstrapIconsModule.pick(allIcons),
  ],
  // bootstrap: [UsersComponent]
})
export class AdminModule {}
