import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';

import { FooterComponent } from './footer.component';

export default {
  title: 'Core/Footer',
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule],
    }),
  ],
};

export const footer = () => ({
  component: FooterComponent,
  props: {},
});
