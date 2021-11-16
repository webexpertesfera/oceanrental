import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { CounterComponent } from './counter.component';

export default {
  title: 'Core/Counter',
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule],
    }),
  ],
};

export const zero = () => ({
  component: CounterComponent,
  props: {},
});

export const two = () => ({
  component: CounterComponent,
  props: {
    count: 2,
  },
});
