import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/interfaces/categorie';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css']
})
export class CategoriesEditComponent implements OnInit {
  id: string = "";
  name: string = "";
  success: boolean = false;
  successMessage: string = "";
  errorsMessages: Array<string> = [];
  error: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private categoriesService: CategoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.find(this.id);
  }

  find(id: string) {
    this.error = false;
    const response = this.categoriesService.find(id).subscribe({
      next: (resp) => {
        this.name = resp.name ?? '';
      },
      error: (error) => {
        this.error = true;
        this.errorsMessages.push(error.error.message);
      }
    })
  }

  update() {
    this.success = false;
    this.error = false;
    this.errorsMessages = [];

    const data = {
      name: this.name
    }

    this.categoriesService.update(this.id, data).subscribe({
      next: () => {
        this.success = true;
        this.successMessage = 'Categoria editada com sucesso.';
      },
      error: (error) => {
        this.error = true;
        this.errorsMessages.push(error.error.message);
      }
    });
  }

}
