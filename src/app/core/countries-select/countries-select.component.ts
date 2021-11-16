import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Country } from '../../booking/models/countries.model';

import Fuse from 'fuse.js';

@Component({
  selector: 'app-countries-select',
  templateUrl: './countries-select.component.html',
  styleUrls: ['./countries-select.component.scss']
})
export class CountriesSelectComponent {
  @ViewChild('countrySelect') countrySelect!: NgbDropdown;
  @ViewChild('countrySearchInput') countrySearchInput!: ElementRef;

  @Input() country: Country | undefined;
  @Output() countryChange = new EventEmitter<Country>();

  isTyping = false;

  countrySearch = '';

  countryName: string = 'Country';

  _allCountries: Array<Country> = [];
  filteredCountries: Array<Country> = [];

  fuse?: any;

  constructor() { }

  // @Input() set country(country: Country | undefined) {
  //   this.countryName = country ? country.name : 'Country';
  // }

  @Input() set countries(countries: Array<Country>) {
    this._allCountries = countries;
    this.filteredCountries = countries;

    this.fuse = new Fuse(this._allCountries, {
      keys: ['name'],
    });
  }

  openCountrySelect() {
    if (!this.countrySelect) return;

    this.isTyping = true;
    setTimeout(() => {
      if (this.countrySearchInput) {
        this.countrySearchInput.nativeElement.focus();
      }
      this.countrySelect.open();
    }, 0);
  }

  countrySearchChange() {
    // this.countryName = "";
    if (!this.countrySearch) {
      this.filteredCountries = this._allCountries;
      return;
    }

    const result = this.fuse.search(this.countrySearch);
    this.filteredCountries = result.map((res: any) => res.item);
  }

  countryClick(country: Country) {
    this.country = country;
    // this.countryName = country.name;
    this.countryChange.emit(this.country);
    setTimeout(() => {
      this.isTyping = false;
      this.countrySelect.close();
      this.countrySearch = '';
    }, 0);
  }
}

