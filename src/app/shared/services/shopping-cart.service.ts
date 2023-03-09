import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Product } from "src/app/pages/products/interfaces/product.interface";

    @Injectable(
        { providedIn: 'root' }
    )

export class shoppingCartService{
  
    products: Product[] = [];

    private cartSubject = new Subject<Product[]>(); 
    private totalSubject = new Subject<number>(); //Total de productos
    private quantitySubject = new Subject<number>(); //cantidad total en precio

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
        this.products.push(product);
        this.cartSubject.next(this.products);
    }
    
    private quantityProducts(): void {
        const quantity = this.products.length;
        this.quantitySubject.next(quantity);
    }
    
    private calcTotal(): void { //Proceso para sumar el precio de los productos seleccionados
        const total = this.products.reduce((acc, prod) => acc += prod.price,0);
        this.totalSubject.next(total);
    }
    
}