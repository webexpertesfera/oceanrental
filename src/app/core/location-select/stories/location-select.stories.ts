import { CommonModule } from '@angular/common';
import {
  NgbDropdown,
  NgbDropdownModule,
  NgbDropdownToggle,
} from '@ng-bootstrap/ng-bootstrap';
import { moduleMetadata } from '@storybook/angular';
import { Location } from '../../models/location.model';
import { LocationSelectComponent } from '../location-select.component';
export default {
  title: 'Core/Location Select',

  component: LocationSelectComponent,
  decorators: [
    moduleMetadata({
      declarations: [LocationSelectComponent],
      imports: [CommonModule, NgbDropdownModule],
      providers: [NgbDropdown, NgbDropdownToggle],
    }),
  ],
};

const location1 = new Location();
location1.id = 1;
location1.name = 'Port of France';

const location2 = new Location();
location2.id = 2;
location2.name = 'Port of Mallorca';

const location3 = new Location();
location3.id = 3;
location3.name = 'Port of Athens';

const location4 = new Location();
location4.id = 4;
location4.name = 'Port of Greece';

let locations: Array<Location> = [];
locations.push(location1);
locations.push(location2);
locations.push(location3);
locations.push(location4);

export const noneSelected = () => ({
  component: LocationSelectComponent,
  props: {
    label: 'pick',
    locations: locations,
  },
});

export const selected = () => ({
  component: LocationSelectComponent,
  props: {
    label: 'drop',
    locations: locations,
    location: location1,
    location2,
    location3,
    location4,
  },
});
