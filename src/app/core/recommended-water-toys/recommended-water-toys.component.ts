import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/product/models/product.model';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-recommended-water-toys',
  templateUrl: './recommended-water-toys.component.html',
  styleUrls: ['./recommended-water-toys.component.scss']
})
export class RecommendedWaterToysComponent implements OnInit {
  @Input() displayCount: number = 15;

  @Output() toyClick = new EventEmitter<Product>();


  private _toys: Array<Product> = [];

  constructor(private router: Router) { }


  ngOnInit(): void { }

  @Input() set toys(t: Array<Product>) {
    this._toys = t.slice(0, this.displayCount);
  }

  get toys(): Array<Product> {
    return this._toys;
  }
}
