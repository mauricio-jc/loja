import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {
  id: string = "";
  productImage1: string = "";
  productImage2: string = "";
  product: Product = {};
  private api: string = environment.api;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsServices: ProductsService,
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.productsServices.find(this.id).subscribe((response) => {
      this.product = response;
      
      this.productImage1 = `${this.api}/products/image/${this.product.image1}`;

      if(this.product.image2 != null) {
        this.productImage2 = `${this.api}/products/image/${this.product.image2}`;
      }
    });
  }

}