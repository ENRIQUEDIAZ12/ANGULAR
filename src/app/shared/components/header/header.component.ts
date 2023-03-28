import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { shoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-header',
  template: `<mat-toolbar color="primary">
    <a routerLink='/'><span>My Store</span></a>
    {{quantity$ | async | json}}
    {{total$ | async | json}} 
  
  <span class="spacer">
  </span>
  <app-cart class="mouseHover" (click)="goToCheckout()"></app-cart>
</mat-toolbar>`,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    quantity$ = this.shoppingCartSvc.quantityAction$;
    total$ = this.shoppingCartSvc.totalAction$;
    cart$ = this.shoppingCartSvc.cartAction$;

  constructor(private router:Router, private shoppingCartSvc: shoppingCartService){}
  goToCheckout():void{
    this.router.navigate(['/checkout']);
  }
}
