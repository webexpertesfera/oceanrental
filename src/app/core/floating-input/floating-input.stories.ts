import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { FloatingInputComponent } from './floating-input.component';

export default {
  title: 'Core/Floating Input',
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule],
    }),
  ],
};

export const yachtNameEmpty = () => ({
  component: FloatingInputComponent,
  props: {
    label: 'Yacht name',
    placeholder: 'Optional'
  },
});

export const yachtNameFilled = () => ({
  component: FloatingInputComponent,
  props: {
    label: 'Yacht name',
    placeholder: 'Optional',
    ngModel: 'The Mik'
  },
});