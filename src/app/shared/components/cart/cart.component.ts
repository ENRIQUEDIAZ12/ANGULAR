import { Component } from "@angular/core";
import { shoppingCartService } from '../../services/shopping-cart.service';

@Component({
    selector: 'app-cart',
    template: `
    <ng-container *ngIf="{total : total$ | async, quantity: quantity$ | async } as dataCart"> 
       <ng-container *ngIf="dataCart.quantity">
            <mat-icon>add_shopping_cart</mat-icon>
         {{dataCart.total | currency}}
         ({{dataCart.quantity}})
        </ng-container>
    </ng-container>
    `

})

export class CartComponent{
    quantity$ = this.shoppingCartSvc.quantityAction$;
    total$ = this.shoppingCartSvc.totalAction$;
    cart$ = this.shoppingCartSvc.cartAction$;
  
    constructor(private shoppingCartSvc: shoppingCartService) { }
  
}
