import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesListComponent } from 'src/app/views/categories/list/categories-list/categories-list.component';
import { CategoriesCreateComponent } from 'src/app/views/categories/create/categories-create/categories-create.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CategoriesListComponent,
    CategoriesCreateComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule
  ]
})
export class CategoriesModule { }
