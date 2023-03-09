import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ProductsService } from './services/products.service';
import {Product} from './interfaces/product.interface';
import { shoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  template: `
  <section class="products">
    <app-product (addToCartClick)="addToCard($event)"
    [product]="product" 
    *ngFor="let product of products"
    ></app-product>
</section>
  `,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  constructor(private productsAll: ProductsService, private shoppingCartSvc: shoppingCartService) { }

  ngOnInit(): void {
    this.productsAll.getProducts()
    .pipe(
      tap((products: Product[])=> this.products = products)
    )
    .subscribe();
  }

  addToCard( product:Product): void{
    this.shoppingCartSvc.updateCart(product);
  }

}
