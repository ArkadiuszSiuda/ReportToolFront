import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { API_PATHS } from 'src/environments/environment';
import { Product } from '../models/product';

const PRODUCTS_API_PATH = `${API_PATHS.base}${API_PATHS.products}`;

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(
    []
  );
  constructor(private client: HttpClient) {}

  public getProducts() {
    return this.client
      .get<Product[]>(PRODUCTS_API_PATH)
      .subscribe((data: Product[]) => {
        this.products$.next(data);
      });
  }

  public getProduct(id: string | null) {
    return this.client.get<Product>(`${PRODUCTS_API_PATH}/${id}`);
  }

  public postProduct(product: Product) {
    return this.client
      .post(PRODUCTS_API_PATH, {
        company: product.company,
        name: product.name,
      })
      .subscribe(() => {
        this.getProducts();
      });
  }

  public updateProduct(product: Product, id: string | null) {
    return this.client
      .put(`${PRODUCTS_API_PATH}/${id}`, {
        company: product.company,
        name: product.name,
      })
      .subscribe(() => {
        this.getProducts();
      });
  }

  public deleteProduct(id: string | null) {
    return this.client.delete(`${PRODUCTS_API_PATH}/${id}`).subscribe(() => {
      this.getProducts();
    });
  }

  public affects(id: string | null) {
    return this.client.get<number>(`${PRODUCTS_API_PATH}/affects/${id}`);
  }
}
