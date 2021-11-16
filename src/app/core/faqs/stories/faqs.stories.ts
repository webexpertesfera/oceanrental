import { CommonModule } from '@angular/common';
import {
    NgbAccordion,
    NgbAccordionModule
} from '@ng-bootstrap/ng-bootstrap';
import { moduleMetadata } from '@storybook/angular';
import { FAQ } from '../../models/faqs.model';
import { FaqsComponent } from '../faqs.component';
export default {
    title: 'Core/FAQs',
    component: FaqsComponent,
    decorators: [
        moduleMetadata({
            declarations: [FaqsComponent],
            imports: [CommonModule, NgbAccordionModule],
            providers: [NgbAccordion],
        }),
    ],

};

const faqExample = new FAQ();
faqExample.id = '1';
faqExample.question = 'Questions about Renting';
faqExample.content = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const faqExample2 = new FAQ();
faqExample2.id = '2';
faqExample2.question = 'Another example question?';
faqExample2.content = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

let faqs: Array<FAQ> = [];
faqs.push(faqExample);
faqs.push(faqExample2);

export const asobdbfusbadfd = () => ({
    component: FaqsComponent,
    props: {
        FAQ: 'test',
        faqs: faqs,
        faq: faqExample,
        faqExample2,

    }

})