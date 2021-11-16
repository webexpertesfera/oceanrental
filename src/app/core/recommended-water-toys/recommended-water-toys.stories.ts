import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Product } from 'src/app/product/models/product.model';
import { RouterTestingModule } from '@angular/router/testing';
// import { Toy } from '../models/toy.model';
import { RecommendedWaterToysComponent } from './recommended-water-toys.component';

export default {
    title: 'Core/WaterToys',
    decorators: [
        moduleMetadata({
            declarations: [RecommendedWaterToysComponent],
            imports: [
                CommonModule, RouterTestingModule,
            ],
            providers: [],
        }),
    ],
};

const toyExample = new Product();
toyExample.id = 1;
toyExample.name = 'Renting';
toyExample.price = 250;
// toyExample.imageThumbnail!.url = '';

const toyExample2 = new Product();
toyExample2.id = 2;
toyExample2.name = 'Question?';
toyExample2.price = 250;
// toyExample2.imageThumbnail!.url = '';

export const TestData = () => ({
    component: RecommendedWaterToysComponent,
    props: {
        toys: [toyExample, toyExample2]
    }
})