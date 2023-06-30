import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesCreateComponent } from 'src/app/views/categories/create/categories-create/categories-create.component';
import { CategoriesEditComponent } from 'src/app/views/categories/edit/categories-edit/categories-edit.component';
import { CategoriesListComponent } from 'src/app/views/categories/list/categories-list/categories-list.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesListComponent
  },
  {
    path: 'create',
    component: CategoriesCreateComponent
  },
  {
    path: 'edit/:id',
    component: CategoriesEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
