import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-form-dialog',
  templateUrl: './product-from-dialog.component.html',
  styleUrls: ['./product-from-dialog.component.css'],
})
export class ProductFormDialogComponent {
  productForm = this.fb.group({
    company: '',
    name: '',
  });

  currentProduct: Product | null = null;
  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    public dialogRef: MatDialogRef<ProductFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: string | null
  ) {
    console.log(data);
    if (data) {
      productService.getProduct(data).subscribe((cd) => {
        this.currentProduct = cd;
        this.productForm.setValue({
          company: this.currentProduct?.company,
          name: this.currentProduct?.name,
        });
      });
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
  onClick() {
    let product = {
      company: this.productForm.value.company!,
      name: this.productForm.value.name!,
    };

    if (this.currentProduct?.id) {
      this.productService.updateProduct(product, this.currentProduct?.id);
    } else {
      this.productService.postProduct(product);
    }

    this.dialogRef.close();
  }
}
