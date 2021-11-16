import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { BtnLoveComponent } from './btn-love.component';

export default {
  title: 'Core/Love Button',
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule],
    }),
  ],
};

export const unloved = () => ({
  component: BtnLoveComponent,
  props: {},
});

export const loved = () => ({
  component: BtnLoveComponent,
  props: {
    loved: true,
  },
});
