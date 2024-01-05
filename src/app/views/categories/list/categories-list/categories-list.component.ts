import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/interfaces/categorie';
import { CategoriesService } from 'src/app/services/categories.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories: Array<Categorie> = [];
  errorsMessages: Array<any> = [];
  error: boolean = false;
  roles$ = this.usersService.getRoles();

  constructor(private categoriesService: CategoriesService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    const response = this.categoriesService.listAll().subscribe((r) => {
      this.categories = r;
    })
  }

  hideAlert() {
    this.error = false;
  }

  delete(id: number | undefined) {
    let result = confirm("Confirma a exclusão?");
    if (result) {
      this.categoriesService.delete(Number(id)).subscribe({
        next: () => {
          this.listAll();
        },
        error: (responseError) => {
          this.error = true;

          if(Array.isArray(responseError.error.message)) {
            this.errorsMessages = responseError.error.message;
          }
          else {
            this.errorsMessages[0] = responseError.error.message;
          }
        }
      });
    }

    return;
  }
}
