import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicLayoutComponent } from '../core/basic-layout/basic-layout.component';
import { AddComponent } from './pages/add/add.component';
import { ProductPage } from './pages/product/product.page';

const routes: Routes = [
  {
    path: 'add',
    component: BasicLayoutComponent,
    children: [{ path: '', component: AddComponent }],
  },
  {
    path: ':product_group_slug/:product_slug',
    component: BasicLayoutComponent,
    children: [{ path: '', component: ProductPage }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
