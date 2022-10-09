import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-delete-dialog',
  templateUrl: './product-delete-dialog.component.html',
  styleUrls: ['./product-delete-dialog.component.css'],
})
export class ProductDeleteDialogComponent {
  productId = '';
  affected = 0;
  constructor(
    private productService: ProductsService,
    public dialogRef: MatDialogRef<ProductDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: string | null
  ) {
    if (data) {
      this.productId = data;
      this.productService.affects(this.productId).subscribe((result) => {
        this.affected = result;
      });
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
  onClick() {
    this.productService.deleteProduct(this.productId);
    this.dialogRef.close();
  }
}
