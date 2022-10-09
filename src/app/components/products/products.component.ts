import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormDialogComponent } from './product-from-dialog/product-from-dialog.component';
import { ProductDeleteDialogComponent } from './product-delete-dialog/product-delete-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products$ = this.productsService.products$;
  displayedColumns: string[] = ['company', 'name', 'actions'];

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog
  ) {
    this.productsService.getProducts();
  }

  setProduct(id: string | null = null) {
    this.dialog.open(ProductFormDialogComponent, {
      width: '450px',
      data: id,
    });
  }

  deleteProduct(id: string | null) {
    this.dialog.open(ProductDeleteDialogComponent, {
      width: '450px',
      data: id,
    });

  }
}
