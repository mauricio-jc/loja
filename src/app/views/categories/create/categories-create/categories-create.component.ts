import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.css']
})
export class CategoriesCreateComponent implements OnInit {
  name: string = "";
  errorsMessages: Array<string> = [];
  error: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  hideAlert() {
    this.error = false;
  }

  create() {
    const data = {
      name: this.name
    };

    this.categoriesService.create(data)
    .subscribe({
      next: () => {
        this.router.navigate(['/categories']);
      },
      error: (responseError) => {
        this.error = true;
        this.errorsMessages = responseError.error.message;
      }
    });
  }
}
