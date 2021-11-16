import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-features',
  templateUrl: './product-features.component.html',
  styleUrls: ['./product-features.component.scss'],
})
export class ProductFeaturesComponent implements OnInit {
  @Input() title: string = 'Title';
  @Input() description: string = 'Long description...';
  @Input() highlights: Array<string> = ['Highlight 1', 'Highlight 2'];

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}
