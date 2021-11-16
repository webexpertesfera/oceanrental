import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from 'src/app/booking/models/booking.model';
import { BookingService } from 'src/app/booking/services/bookings.service';
import { LocationService } from 'src/app/core/services/location.service';
import { RecommendedAccessoriesComponent } from '../../modals/recommended-accessories/recommended-accessories.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  booking: Booking | undefined;
  product: Product | undefined;
  accessories: Array<Product> = [];
  redirectUrl: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private modalService: NgbModal,
    private productService: ProductService,
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(async (params) => {
      const bookingId = params.booking_id;
      const productId = params.product_id;
      this.redirectUrl = params.redirect_url;

      this.booking = this.bookingService.getBookingById(bookingId);
      if (!this.booking) {
        alert(`Booking not found by ID: ${bookingId}`);
        return;
      }

      let p = this.booking.products.find((p) => p.id == productId);
      if (!p) {
        alert(`Product not found by ID: ${productId}`);
        return;
      }

      const response = await this.productService.getProductById(p.id!);
      this.product = response.product;
      this.product.quantity = p.quantity || 1;
      this.accessories = response.accessories;

      // Format the WP booking if needed
      if (Object.keys(p).length !== Object.keys(this.product).length) {
        const locations = await this.locationService.getLocations();
        this.booking.location.collection = locations.find(
          (l) => l.name === this.booking?.location.collection?.name
        );
        this.booking.location.delivery = locations.find(
          (l) => l.name === this.booking?.location.delivery?.name
        );

        const accessories = p.accessories || []
        this.bookingService.removeProduct(this.booking, p);
        this.bookingService.save();

        this.product.accessories = accessories;
        this.bookingService.addToBooking(this.booking, this.product);
        this.bookingService.save();
      }

      this.openRecommendedAccessories();
    });
  }

  async openRecommendedAccessories() {
    const modal = this.modalService.open(RecommendedAccessoriesComponent, {
      size: 'xl',
      scrollable: true,
    });
    modal.componentInstance.accessories = this.accessories;

    try {
      const accessoriesToAdd = await modal.result;
      await this.bookingService.addAccessories(
        this.booking!,
        this.product!,
        accessoriesToAdd
      );
      this.router.navigate(['bookings', 'recently-added']);
    } catch (err) {
      this.router.navigate(['bookings', 'recently-added']);
    }
  }
}
