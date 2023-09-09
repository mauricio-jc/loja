import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsListComponent } from 'src/app/views/products/list/products-list/products-list.component';
import { ProductsCreateComponent } from 'src/app/views/products/create/products-create/products-create.component';
import { ProductsEditComponent } from 'src/app/views/products/edit/products-edit/products-edit.component';


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsCreateComponent,
    ProductsEditComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProductsModule { }
