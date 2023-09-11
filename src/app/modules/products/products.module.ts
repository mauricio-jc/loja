import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsListComponent } from 'src/app/views/products/list/products-list/products-list.component';
import { ProductsCreateComponent } from 'src/app/views/products/create/products-create/products-create.component';
import { ProductsEditComponent } from 'src/app/views/products/edit/products-edit/products-edit.component';
import { OnlyNumberDirective } from 'src/app/shared/directives/only-number.directive';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsCreateComponent,
    ProductsEditComponent,
    OnlyNumberDirective,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
  ]
})
export class ProductsModule { }
