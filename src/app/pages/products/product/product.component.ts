import { Component, Input, Output,EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  //Comunicando de hijo a padre
  @Input() product!:Product;
  //Comunicando de hijo a padre
  @Output() addToCartClick = new EventEmitter<Product>();

   onClick(): void {
    this.addToCartClick.emit(this.product);
  }

}
