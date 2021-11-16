import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from 'src/app/booking/models/booking.model';
import { BookingService } from 'src/app/booking/services/bookings.service';
import { LoginModalComponent } from 'src/app/core/modals/login-modal/login-modal.component';
import { SignUpModalComponent } from 'src/app/core/modals/sign-up-modal/sign-up-modal.component';
import { AvailabilityState } from 'src/app/core/models/availability-state';
import { Breadcrumb } from 'src/app/core/models/breadcrumb.model';
import { Location } from 'src/app/core/models/location.model';
import { LocationService } from 'src/app/core/services/location.service';
import { MetadataService } from 'src/app/core/services/metadata.service';
import { environment } from 'src/environments/environment';
import { AddToBookingComponent } from '../../modals/add-to-booking/add-to-booking.component';
import { DropOffLocationComponent } from '../../modals/drop-off-location/drop-off-location.component';
import { PickUpLocationComponent } from '../../modals/pick-up-location/pick-up-location.component';
import { ProductFeaturesComponent } from '../../modals/product-features/product-features.component';
import { RecommendedAccessoriesComponent } from '../../modals/recommended-accessories/recommended-accessories.component';
import { SelectDatesComponent } from '../../modals/select-dates/select-dates.component';
import { YachtNameComponent } from '../../modals/yacht-name/yacht-name.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  @ViewChild('productImage', { static: false }) imageCarousel?: ElementRef;

  breadcrumbs: Array<Breadcrumb> = [
    {
      absolutePath: environment.home,
      label: 'Rentals',
      active: false,
      disabled: false,
    },
  ];

  bookings: Array<Booking> = [];
  currentBooking: Booking | undefined;
  product?: Product;
  accessories: Array<Product> = [];
  productSlug: string = '';
  productGroupSlug?: string;
  locations: Array<Location> = [];
  recommendedProducts: Array<Product> = [];
  recommendedWaterToys: Array<Product> = [];

  availabilityChecked = false;
  isAvailable = false;

  modalBooking: Booking = new Booking();
  popularMediterraneanPorts: Array<Location> = [];
  popularCaribbeanPorts: Array<Location> = [];

  unauthBookingProduct:
    | { booking: Booking; product: Product | undefined }
    | undefined;

  availabilityState: AvailabilityState = new AvailabilityState();
  loadingAvailability: boolean = false;

  faqsTitle: string = 'Questions about Booking';

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private productService: ProductService,
    private bookingService: BookingService,
    private locationService: LocationService,
    private router: Router,
    //private ngAuthService: NgAuthService,
    @Optional() private metaService: MetadataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (!params.has('product_slug')) {
        console.log('Product not found');
        return;
      }

      // TODO: Get product_group_slug and product_slug
      const productGroupSlug = params.get('product_group_slug')!;
      const productSlug = params.get('product_slug')!;
      this.findProductBySlug(productGroupSlug, productSlug);
      this.getLocations();
    });
  }

  openFeatures() {
    const modal = this.modalService.open(ProductFeaturesComponent, {
      size: 'lg',
    });
    modal.componentInstance.title = this.product?.name;
    modal.componentInstance.description = this.product?.features;
  }

  openGallery() {
    if (this.imageCarousel) {
      this.imageCarousel.nativeElement.click();
    }
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
        this.currentBooking!,
        this.product!,
        accessoriesToAdd
      );
      this.router.navigate(['bookings', 'recently-added']);
    } catch (err) {
      this.router.navigate(['bookings', 'recently-added']);
    }
  }

  private async findProductBySlug(
    productGroupSlug: string,
    productSlug: string
  ): Promise<void> {
    this.breadcrumbs = [
      {
        absolutePath: environment.home,
        label: 'Rentals',
        active: false,
        disabled: false,
      },
    ];

    try {
      const productAndAccessories = await this.productService.getProductBySlug(
        productGroupSlug,
        productSlug
      );
      this.accessories = productAndAccessories.accessories;
      this.product = productAndAccessories.product;
      var recomProd = this.accessories;
      recomProd.forEach((product) => (product.quantity = 0));
      recomProd = recomProd.filter((x) => x.type === 'OPTIONAL');
      this.recommendedProducts = recomProd;

      this.findRecommendedWaterToys(this.product);

      if (this.metaService) {
        this.metaService.updateMetadata({
          title: `${this.product.slug || this.product.name
            } for Superyachts | Ocean Premium`,
          description: `${this.product.seoMetaDescription ||
            this.product.slug ||
            this.product.name
            }`,
        });
      }

      // TODO: When api provides a URL to use, use that here
      this.breadcrumbs.push({
        absolutePath: environment.home,
        label: this.product.productGroup!.name!,
        active: false,
        disabled: false,
      });
      this.breadcrumbs.push({
        path: '/',
        label: this.product.name!,
        active: true,
        disabled: false,
      });

      this.faqsTitle = `Questions about ${this.product.name}`;

      this.bookings = this.bookingService.getBookings();
      this.currentBooking = this.bookingService.getCurrentBooking();

      if (!this.currentBooking && this.bookings.length > 0) {
        this.currentBooking = this.bookings[0];
        this.bookingService.setCurrentBooking(this.currentBooking);
      }

      if (!this.currentBooking && this.bookings.length === 0) {
        this.currentBooking = new Booking();

        if (isPlatformBrowser(this.platformId)) {
          const lastSearch = JSON.parse(
            localStorage.getItem('last_search') || '{}'
          );
          if (lastSearch) {
            try {
              this.currentBooking.location.collection =
                lastSearch.location?.collection;
              this.currentBooking.location.delivery =
                lastSearch.location?.delivery;

              if (lastSearch.period.start) {
                const fromParts = (lastSearch.period.start as string).split(
                  '-'
                );
                const fromYear = Number(fromParts[0]);
                const fromMonth = Number(fromParts[1]);
                const fromDay = Number(fromParts[2].split('T')[0]);
                this.currentBooking.period.fromDate = new NgbDate(
                  fromYear,
                  fromMonth,
                  fromDay
                );
              }

              if (lastSearch.period.end) {
                const parts = (lastSearch.period.end as string).split('-');
                const year = Number(parts[0]);
                const month = Number(parts[1]);
                const day = Number(parts[2].split('T')[0]);
                this.currentBooking.period.fromDate = new NgbDate(
                  year,
                  month,
                  day
                );
              }

              setTimeout(() => {
                this.bookingService.forceAvailabilityCheck();
              }, 5000);
            } catch (err) {
              console.log('Failed to use last search: ', err);
            }
          }
        }
      }

      this.bookingService.bookingsChanged.subscribe(() => {
        this.bookings = this.bookingService.getBookings();
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getLocations() {
    this.locations = await this.locationService.getLocations();
    this.locations.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
    this.popularMediterraneanPorts = await this.locationService.getPopularMediterraneanPorts(
      this.locations
    );
    this.popularCaribbeanPorts = await this.locationService.getPopularCaribbeanPorts(
      this.locations
    );
  }

  manageBookingClick(booking: Booking) {
  }

  lovedChange(loved: boolean) {
    console.log(loved);
  }

  async openLoginModal() {
    const modal = this.modalService.open(LoginModalComponent, {
      size: 'lg',
    });

    modal.dismissed.subscribe((reason) => {
      if (reason === 'signup') {
        this.openSignUpModal();
      }
    });

    modal.result
      .then((_user) => {
        if (this.unauthBookingProduct) {
          this.addToBooking(this.unauthBookingProduct);
        }
      })
      .then((err) => {
        console.log('login error: ', err);
      });
  }

  openSignUpModal() {
    const modal = this.modalService.open(SignUpModalComponent, {
      size: 'lg',
    });

    modal.dismissed.subscribe((reason) => {
      if (reason === 'login') {
        this.openLoginModal();
      }
    });

    modal.result
      .then((_user) => {
        if (this.unauthBookingProduct) {
          this.addToBooking(this.unauthBookingProduct);
        }
      })
      .then((err) => {
        console.log('signup error: ', err);
      });
  }

  async openAddToBookingModal() {
    if (this.bookings.length === 0) {
      this.openYachtNameModal();
      return;
    }

    const modal = this.modalService.open(AddToBookingComponent, {
      size: 'xl',
      scrollable: true,
    });
    modal.componentInstance.bookings = this.bookings;

    modal.dismissed.subscribe((reason: 'create-booking' | null) => {
      if (!reason) return;

      if (reason === 'create-booking') {
        this.openYachtNameModal();
      }
    });

    modal.result
      .then((booking: Booking) => {
        this.addToBooking({
          booking: booking,
          product: this.product!,
        });
      })
      .catch((err) => {
        console.log('Add to booking error: ', err);
      });
  }

  async openYachtNameModal() {
    const modal = this.modalService.open(YachtNameComponent, {
      size: 'xl',
      scrollable: true,
    });

    modal.dismissed.subscribe((reason: 'back' | null) => {
      if (!reason) return;

      if (reason === 'back') {
        if (this.bookings.length > 0) {
          this.openAddToBookingModal();
        }
      }
    });

    modal.result
      .then((yachtName: string | undefined) => {
        this.modalBooking.yachtName = yachtName;
        this.openPickUpLocationModal();
      })
      .catch((err) => {
        console.log('yacht name error: ', err);
      });
  }

  async openPickUpLocationModal() {
    const modal = this.modalService.open(PickUpLocationComponent, {
      size: 'xl',
      scrollable: true,
    });
    modal.componentInstance.locations = this.locations;
    modal.componentInstance.pickUpLocation = this.modalBooking.location.collection;
    modal.componentInstance.popularMediterraneanPorts = this.popularMediterraneanPorts;
    modal.componentInstance.popularCaribbeanPorts = this.popularCaribbeanPorts;

    modal.dismissed.subscribe((reason: 'back' | null) => {
      if (!reason) return;

      if (reason === 'back') {
        this.openYachtNameModal();
      }
    });

    modal.result
      .then((location: Location) => {
        this.modalBooking.location.collection = location;
        this.openDropOffLocationModal();
      })
      .catch((err) => {
        console.log('pick up location error: ', err);
      });
  }

  async openDropOffLocationModal() {
    const modal = this.modalService.open(DropOffLocationComponent, {
      size: 'xl',
      scrollable: true,
    });
    modal.componentInstance.locations = this.locations;
    modal.componentInstance.dropOffLocation = this.modalBooking.location.delivery;
    modal.componentInstance.popularMediterraneanPorts = this.popularMediterraneanPorts;
    modal.componentInstance.popularCaribbeanPorts = this.popularCaribbeanPorts;
    modal.componentInstance.pickUpLocation = this.modalBooking.location.collection;

    modal.dismissed.subscribe((reason: 'back' | null) => {
      if (!reason) return;

      if (reason === 'back') {
        this.openPickUpLocationModal();
      }
    });

    modal.result
      .then((location: Location) => {
        this.modalBooking.location.delivery = location;
        this.openSelectDatesModal();
      })
      .catch((err) => {
        console.log('drop off location error: ', err);
      });
  }

  async openSelectDatesModal() {
    const modal = this.modalService.open(SelectDatesComponent, {
      size: 'xl',
      scrollable: true,
    });
    modal.componentInstance.product = this.product;
    modal.componentInstance.booking = this.modalBooking;

    modal.dismissed.subscribe((reason: 'back' | null) => {
      if (!reason) return;

      if (reason === 'back') {
        this.openDropOffLocationModal();
      }
    });

    modal.result
      .then((response: { fromDate: NgbDate; toDate: NgbDate }) => {
        this.modalBooking.period.fromDate = response.fromDate;
        this.modalBooking.period.toDate = response.toDate;

        this.addToBooking({
          booking: this.modalBooking,
          product: this.product!,
        });
      })
      .catch((err) => {
        console.log('drop off location error: ', err);
      });
  }

  availability(availabilityState: AvailabilityState) {
    this.availabilityState = availabilityState;
    this.availabilityChecked = true;
  }

  loadingAvailabilityEvent(loading: any) {
    this.loadingAvailability = loading as boolean;
  }

  async addToBooking(bookingAndProduct: {
    booking: Booking;
    product: Product | undefined;
  }) {
    if (isPlatformBrowser(this.platformId)) {
      if (!localStorage.getItem('APPSTRAX_AUTH_TOKEN')) {
        this.unauthBookingProduct = bookingAndProduct;
        this.openLoginModal();
        return;
      }
    }

    const booking = await this.bookingService.addToBooking(
      bookingAndProduct.booking,
      bookingAndProduct.product!
    );
    this.bookingService.setCurrentBooking(booking);
    this.currentBooking = booking;
    this.openRecommendedAccessories();
  }

  productClick(product: Product) {
    if (product.productGroupSlug && product.productSlug) {
      this.router.navigate([product.productGroupSlug, product.productSlug]);
    } else {
      return;
    }
  }

  toyClick(toy: Product) {
    if (toy.productGroupSlug && toy.productSlug) {
      this.router.navigate([toy.productGroupSlug, toy.productSlug]);
    } else {
      return;
    }
  }

  async findRecommendedProducts(product: Product) {
    if (!product.productGroup) {
      throw new Error(
        "Product Group not found, can't get recommended products"
      );
    }

    const productGroupIds = [product.productGroup?.id!];
    this.recommendedProducts = await this.productService.getRecommendedProducts(
      productGroupIds
    );

    this.findRecommendedWaterToys(product);
  }

  async findRecommendedWaterToys(product: Product) {
    if (!product.productGroup) {
      throw new Error(
        "Product Group not found, can't get recommended water toys"
      );
    }

    if (this.recommendedWaterToys.length) {
      console.log('Already have toys', this.recommendedWaterToys);
    } else {
      const productGroupIds = [product.productGroup?.id!];
      this.recommendedWaterToys = await this.productService.getRecommendedWaterToys(
        productGroupIds
      );
    }
  }
}
