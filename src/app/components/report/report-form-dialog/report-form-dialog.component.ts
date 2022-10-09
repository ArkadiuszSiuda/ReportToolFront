import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Report } from 'src/app/models/report';
import { CodesService } from 'src/app/services/codes.service';
import { ProductsService } from 'src/app/services/products.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report-form-dialog',
  templateUrl: './report-form-dialog.component.html',
  styleUrls: ['./report-form-dialog.component.css'],
})
export class ReportFormDialogComponent {
  reportForm = this.fb.group({
    comment: '',
    toReproduce: '',
    reproducibility: 0,
    codeId: '',
    productId: '',
  });

  codes$ = this.codeService.codes$;
  products$ = this.productService.products$;
  currentReport: Report | null = null;

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    public dialogRef: MatDialogRef<ReportFormDialogComponent>,
    private codeService: CodesService,
    private productService: ProductsService,
    @Inject(MAT_DIALOG_DATA) data: string | null
  ) {
    if (data) {
      reportService.getReport(data).subscribe((cd) => {
        this.currentReport = cd;
        this.reportForm.setValue({
          comment: this.currentReport?.comment,
          toReproduce: this.currentReport?.toReproduce,
          reproducibility: this.currentReport?.reproducibility,
          codeId: this.currentReport?.codeId,
          productId: this.currentReport?.productId,
        });
      });
    }
    this.codeService.getCodes();
    this.productService.getProducts();
  }

  onNoClick() {
    this.dialogRef.close();
  }
  onClick() {
    let report = {
      comment: this.reportForm.value.comment!,
      toReproduce: this.reportForm.value.toReproduce!,
      reproducibility: this.reportForm?.value.reproducibility!,
      codeId: this.reportForm.value.codeId!,
      productId: this.reportForm.value.productId!,
    };
    if (this.currentReport?.id) {
      this.reportService.updateReport(report, this.currentReport.id);
    } else {
      this.reportService.postReport(report);
    }

    this.dialogRef.close();
  }
}
