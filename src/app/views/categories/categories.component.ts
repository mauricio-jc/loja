import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/interfaces/categories';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Array<Categories> = [];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    const response = this.categoriesService.listAll().subscribe((r) => {
      this.categories = r;
    })
  }

}
