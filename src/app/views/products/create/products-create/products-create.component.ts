import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categorie } from 'src/app/interfaces/categorie';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css']
})
export class ProductsCreateComponent implements OnInit {
  categories: Array<Categorie> = [];
  form!: FormGroup;
  errorsMessages: Array<string> = [];
  error: boolean = false;
  image1Preview: File | any = null;
  preview1: string = '';
  image2Preview: File | any = null;
  preview2: string = '';

  constructor(
    private categoriesServices: CategoriesService,
  ) { }

  get image1(): any {
    return this.form.get('image1');
  }

  get image2(): any {
    return this.form.get('image2');
  }

  get name(): any {
    return this.form.get('name');
  }

  get price(): any {
    return this.form.get('price');
  }

  get quantity(): any {
    return this.form.get('quantity');
  }

  get description(): any {
    return this.form.get('description');
  }

  get categoryId(): any {
    return this.form.get('categoryId');
  }

  ngOnInit(): void {
    this.listCategories();

    this.form = new FormGroup({
      image1: new FormControl('', [Validators.required]),
      image1Source: new FormControl('', [Validators.required]),
      image2: new FormControl(''),
      image2Source: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required])
    });
  }

  listCategories() {
    this.categoriesServices.listAll().subscribe((r) => {
      this.categories = r;
    });
  }

  hideAlert() {
    this.error = false;
  }

  readURL(fileEvent: any, image: string): void | boolean {
    const file = fileEvent?.files[0];
    const sizeImg = file.size / 1024;

    if(sizeImg > 1024) {
      alert('A imagem tem que ser menor do que 1 MB.');

      if(image == 'image1') {
        this.image1.setValue('');
      }
      else {
        this.image2.setValue('');
      }

      return false;
    }

    if(image == 'image1') {
      this.image1Preview = file;
      this.form.patchValue({ image1Source: file });
      const reader = new FileReader();
      reader.onload = (event: any): any => (this.preview1 = event.target.result);
      reader.readAsDataURL(file);
    }
    else {
      this.image2Preview = file;
      this.form.patchValue({ image2Source: file });
      const reader = new FileReader();
      reader.onload = (event: any): any => (this.preview2 = event.target.result);
      reader.readAsDataURL(file);
    }
  }

  removeImage(image: string): void {
    if(image == 'image1') {
      this.image1Preview = null;
      this.preview1 = '';
    }
    else {
      this.image2Preview = null;
      this.preview2 = '';
    }

  }

  create() {}
}
