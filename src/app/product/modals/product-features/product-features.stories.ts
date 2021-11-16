import { CommonModule } from '@angular/common';
import {
  NgbActiveModal,
  NgbModalModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { moduleMetadata } from '@storybook/angular';

import { ProductFeaturesComponent } from './product-features.component';

export default {
  title: 'Product/Modals',
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, NgbModule, NgbModalModule],
      providers: [NgbActiveModal],
    }),
  ],
};

export const productFeatures = () => ({
  component: ProductFeaturesComponent,
  props: {
    title: 'Test'
  },
});
