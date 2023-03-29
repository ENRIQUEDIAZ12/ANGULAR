import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "src/app/pages/products/interfaces/product.interface";

    @Injectable(
        { providedIn: 'root' }
    )

export class shoppingCartService{
  
    products: Product[] = [];

    private cartSubject = new BehaviorSubject<Product[]>([]); 
    private totalSubject = new BehaviorSubject<number>(0); //Total de productos
    private quantitySubject = new BehaviorSubject<number>(0); //cantidad total en precio

    get totalAction$(): Observable<number>{ //Se guarda el valor de del precio de los productos seleccionados
        return this.totalSubject.asObservable();
    }
    get quantityAction$(): Observable<number>{
        return this.quantitySubject.asObservable();
    }
    get cartAction$(): Observable<Product[]>{
        return this.cartSubject.asObservable();
    }

    updateCart (product: Product): void { //Se llama al metodo desde el onclick de products
        this.addToCard(product);
        this.quantityProducts();
        this.calcTotal();
    }

    private addToCard(product: Product): void {
    const isProductInCart = this.products.find(({ id }) => id === product.id);

        if (isProductInCart) {
            isProductInCart.qty += 1;
        }else{
            this.products.push({... product, qty: 1});
        }
        this.cartSubject.next(this.products);
    }
    
    private quantityProducts(): void {
        const quantity = this.products.reduce((acc, prod) => acc += prod.qty,0);
        this.quantitySubject.next(quantity);
    }
    
    private calcTotal(): void { //Proceso para sumar el precio de los productos seleccionados
        const total = this.products.reduce((acc, prod) => acc += (prod.price * prod.qty),0);
        this.totalSubject.next(total);
    }
    
}