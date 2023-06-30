import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/interfaces/categorie';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categories: Array<Categorie> = [];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    const response = this.categoriesService.listAll().subscribe((r) => {
      this.categories = r;
    })
  }

  delete(id: number | undefined) {
    let result = confirm("Confirma a exclusão?");
    if (result) {
      this.categoriesService.delete(Number(id)).subscribe(() => {
        this.listAll();
      });
    }

    return;
  }
}
