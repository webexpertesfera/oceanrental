import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/booking/services/bookings.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-recommended-accessories',
  templateUrl: './recommended-accessories.component.html',
  styleUrls: ['./recommended-accessories.component.scss'],
})
export class RecommendedAccessoriesComponent implements OnInit {
  // @Input() accessories: Array<Product> = [];

  @Output() accessoriesAdded = new EventEmitter<Array<Product>>();

  accessoriesToAdd: Array<Product> = [];

  valid: Boolean = true;

  private _accessories: Array<Product> = [];

  constructor(public modal: NgbActiveModal, private bookingService: BookingService) { }

  ngOnInit(): void { }

  @Input() set accessories(accessories: Array<Product>) {
    this._accessories = accessories;
    this._accessories.forEach((product) => (product.quantity = 0));
    this._accessories = this._accessories.filter((x) => x.type === 'OPTIONAL');
  }

  get accessories(): Array<Product> {
    return this._accessories;
  }

  recommendedProductAdded(product: Product) {
    if (product.quantity <= 0) {
      this.accessoriesToAdd = this.accessoriesToAdd.filter(
        (a) => a.id !== product.id
      );
      return;
    }

    const exists = this.accessoriesToAdd.find(
      (accessory) => accessory.id === product.id
    );
    if (exists) {
      exists.quantity = product.quantity;
    } else {
      this.accessoriesToAdd.push(product);
    }
  }

  isValid(valid: Boolean) {
    this.valid = valid;
  }

  nextClick() {
    this.accessoriesAdded.emit(this.accessoriesToAdd);
    this.modal.close(this.accessoriesToAdd);
  }
}
