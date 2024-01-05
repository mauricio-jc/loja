import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.css']
})
export class CategoriesCreateComponent implements OnInit {
  form!: FormGroup;
  errorsMessages: Array<any> = [];
  error: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required])
    })
  }

  get name() {
    return this.form.get('name')!;
  }

  hideAlert() {
    this.error = false;
  }

  create() {
    if(this.form.invalid) {
      return;
    }

    this.categoriesService.create(this.form.value)
    .subscribe({
      next: () => {
        this.router.navigate(['/categories']);
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
}
