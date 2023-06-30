import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesListComponent } from 'src/app/views/categories/list/categories-list/categories-list.component';
import { CategoriesCreateComponent } from 'src/app/views/categories/create/categories-create/categories-create.component';
import { FormsModule } from '@angular/forms';
import { CategoriesEditComponent } from 'src/app/views/categories/edit/categories-edit/categories-edit.component';

@NgModule({
  declarations: [
    CategoriesListComponent,
    CategoriesCreateComponent,
    CategoriesEditComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule
  ]
})
export class CategoriesModule { }
