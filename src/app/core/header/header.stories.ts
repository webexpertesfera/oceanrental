import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata } from '@storybook/angular';

import { HeaderComponent } from './header.component';

export default {
  title: 'Core/Header',
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, RouterTestingModule],
    }),
  ],
};

export const header = () => ({
  component: HeaderComponent,
  props: {},
});
