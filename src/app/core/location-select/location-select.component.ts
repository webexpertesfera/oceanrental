import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '../models/location.model';

import Fuse from 'fuse.js';

@Component({
  selector: 'app-location-select',
  templateUrl: './location-select.component.html',
  styleUrls: ['./location-select.component.scss'],
})
export class LocationSelectComponent {
  @ViewChild('locationSelect') locationSelect!: NgbDropdown;
  @ViewChild('locationSearchInput') locationSearchInput!: ElementRef;

  @Input() location: Location | undefined;
  @Input() showCollect: boolean = false;
  @Input() showDeliver: boolean = false;
  @Input() label: String = 'PICK-UP';
  @Output() locationChange = new EventEmitter<Location>();

  isTyping = false;

  locationSearch = '';

  _allLocations: Array<Location> = [];
  filteredLocations: Array<Location> = [];

  fuse?: any;

  constructor() {}

  @Input() set locations(locations: Array<Location>) {
    this._allLocations = locations;
    this.filteredLocations = locations;

    this.fuse = new Fuse(this._allLocations, {
      keys: ['name'],
    });
  }

  openLocationSelect() {
    if (!this.locationSelect) return;

    this.isTyping = true;
    setTimeout(() => {
      if (this.locationSearchInput) {
        this.locationSearchInput.nativeElement.focus();
      }
      this.locationSelect.open();
    }, 0);
  }

  locationSearchChange() {
    if (!this.locationSearch) {
      this.filteredLocations = this._allLocations;
      return;
    }

    const result = this.fuse.search(this.locationSearch);
    this.filteredLocations = result.map((res: any) => res.item);
  }

  locationClick(location: Location) {
    this.location = location;
    this.locationChange.emit(this.location);
    setTimeout(() => {
      this.isTyping = false;
      this.locationSelect.close();
      this.locationSearch = '';
    }, 0);
  }
}
