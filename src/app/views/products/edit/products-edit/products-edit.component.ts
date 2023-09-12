import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/interfaces/categorie';
import { Product } from 'src/app/interfaces/product';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
  id: string = "";
  productImage1: string = "";
  productImage2: string = "";
  categories: Array<Categorie> = [];
  product: Product = {};
  form!: FormGroup;
  errorsMessages: Array<string> = [];
  error: boolean = false;
  image1Preview: File | any = null;
  preview1: any = '';
  image2Preview: File | any = null;
  preview2: any = '';
  private api: string = environment.api;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriesServices: CategoriesService,
    private productsServices: ProductsService,
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
    this.form = new FormGroup({
      image1: new FormControl(''),
      image1Source: new FormControl(''),
      image2: new FormControl(''),
      image2Source: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required])
    });

    this.id = this.activatedRoute.snapshot.params['id'];

    this.categoriesServices.listAll().subscribe((response) => {
      this.categories = response;
    });

    this.productsServices.find(this.id).subscribe((response) => {
      this.product = response;

      this.productImage1 = `${this.api}/products/image/${this.product.image1}`;

      if(this.product.image2 != null) {
        this.productImage2 = `${this.api}/products/image/${this.product.image2}`;
      }

      this.name.setValue(this.product.name);
      this.price.setValue(this.product.price);
      this.quantity.setValue(this.product.quantity);
      this.description.setValue(this.product.description);
      this.categoryId.setValue(this.product.category?.id);
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
      this.preview1 = null;
      this.image1.setValue('');
    }
    else {
      this.image2Preview = null;
      this.preview2 = null;
      this.image2.setValue('');
    }
  }

  update(): void {
    if (!this.form.valid) {
      return;
    }

    const data = this.form.value;
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('quantity', data.quantity);
    formData.append('description', data.description);
    formData.append('category_id', data.categoryId);

    if(data.image1 !== "") {
      formData.append('images', data.image1Source);
      formData.append('change_image1', 'change');
    }
    else {
      formData.append('change_image1', this.productImage1);
    }

    if(data.image2 !== "") {
      formData.append('images', data.image2Source);
      formData.append('change_image2', 'change');
    }
    else {
      formData.append('change_image2', this.productImage2);
    }

    this.productsServices.update(this.id, formData).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (responseError) => {
        this.error = responseError;
        this.errorsMessages = responseError.error.message
      }
    });
  }
}
