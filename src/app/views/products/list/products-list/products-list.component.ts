import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  api: string = environment.api;
  products: Array<Product> = [];

  constructor(private productsServices: ProductsService) { }

  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    const response = this.productsServices.listAll().subscribe((r) => {
      this.products = r;
    })
  }

  delete(id: number | undefined) {
    let result = confirm("Confirma a exclusão?");
    if (result) {
      // this.productsServices.delete(Number(id)).subscribe(() => {
      //   this.listAll();
      // });
    }

    return;
  }
}
