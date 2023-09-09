import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsCreateComponent } from 'src/app/views/products/create/products-create/products-create.component';
import { ProductsEditComponent } from 'src/app/views/products/edit/products-edit/products-edit.component';
import { ProductsListComponent } from 'src/app/views/products/list/products-list/products-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent
  },
  {
    path: 'create',
    component: ProductsCreateComponent
  },
  {
    path: 'edit/:id',
    component: ProductsEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
