import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductRoutingModule } from './product-routing.module';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';
import {
  NgbCarouselModule,
  NgbDatepickerModule,
  NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap';

import { ProductPage } from './pages/product/product.page';
import { ProductFeaturesComponent } from './modals/product-features/product-features.component';
import { RecommendedAccessoriesComponent } from './modals/recommended-accessories/recommended-accessories.component';
import { YachtNameComponent } from './modals/yacht-name/yacht-name.component';
import { AddToBookingComponent } from './modals/add-to-booking/add-to-booking.component';
import { PickUpLocationComponent } from './modals/pick-up-location/pick-up-location.component';
import { DropOffLocationComponent } from './modals/drop-off-location/drop-off-location.component';
import { SelectDatesComponent } from './modals/select-dates/select-dates.component';
import { AddComponent } from './pages/add/add.component';

@NgModule({
  declarations: [
    ProductPage,
    ProductFeaturesComponent,
    RecommendedAccessoriesComponent,
    YachtNameComponent,
    AddToBookingComponent,
    PickUpLocationComponent,
    DropOffLocationComponent,
    SelectDatesComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ProductRoutingModule,
    CrystalLightboxModule,
    NgbModalModule,
    NgbCarouselModule,
    CoreModule,
    NgbDatepickerModule,
  ],
})
export class ProductModule {}
