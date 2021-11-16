import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CoreRoutingModule } from './core-routing.module';

import { HttpService } from './services/http.service';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CounterComponent } from './counter/counter.component';
import { BtnLoveComponent } from './btn-love/btn-love.component';
import { OrderFaqComponent } from './order-faq/order-faq.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { WeSpecializeComponent } from './we-specialize/we-specialize.component';
import { FloatingInputComponent } from './floating-input/floating-input.component';
import { NewQuestionComponent } from '../core/new-question/new-question.component';
import { MyBookingsListItemComponent } from './my-bookings-list-item/my-bookings-list-item.component';
import { ProductPreviewImages } from '../core/product-preview-images/product-preview-images.component';
import { SingleProductListItemComponent } from './single-product-list-item/single-product-list-item.component';
import { LocationSelectComponent } from './location-select/location-select.component';
import { BookingSelectComponent } from './booking-select/booking-select.component';
import {
  NgbAccordionModule,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap';
import { RecommendedProductCarousel } from '../core/recommended-product-carousel/recommended-product-carousel.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BookingListItemComponent } from './booking-list-item/booking-list-item.component';
import { FaqsComponent } from './faqs/faqs.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { SignUpModalComponent } from './modals/sign-up-modal/sign-up-modal.component';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { MetadataService } from './services/metadata.service';
import { CountriesSelectComponent } from './countries-select/countries-select.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RecommendedWaterToysComponent } from './recommended-water-toys/recommended-water-toys.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BtnLoveComponent,
    CounterComponent,
    OrderFaqComponent,
    BasicLayoutComponent,
    BreadcrumbsComponent,
    ProductPreviewImages,
    NewQuestionComponent,
    WeSpecializeComponent,
    FloatingInputComponent,
    RecommendedProductCarousel,
    MyBookingsListItemComponent,
    SingleProductListItemComponent,
    LocationSelectComponent,
    BookingSelectComponent,
    BookingFormComponent,
    BookingListItemComponent,
    FaqsComponent,
    LoginComponent,
    SignUpComponent,
    LoginModalComponent,
    SignUpModalComponent,
    CountriesSelectComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RecommendedWaterToysComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModalModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbAccordionModule,
    NgxBootstrapIconsModule.pick(allIcons),
    CoreRoutingModule,
    NgbModule
  ],
  exports: [
    HeaderComponent,
    BtnLoveComponent,
    CounterComponent,
    OrderFaqComponent,
    ProductPreviewImages,
    NewQuestionComponent,
    BreadcrumbsComponent,
    WeSpecializeComponent,
    FloatingInputComponent,
    RecommendedProductCarousel,
    MyBookingsListItemComponent,
    SingleProductListItemComponent,
    BookingSelectComponent,
    BookingFormComponent,
    LocationSelectComponent,
    BookingListItemComponent,
    LoginComponent,
    SignUpComponent,
    LoginModalComponent,
    SignUpModalComponent,
    FaqsComponent,
    CountriesSelectComponent,
    RecommendedWaterToysComponent,
  ],
  providers: [HttpService, MetadataService],
})
export class CoreModule { }
