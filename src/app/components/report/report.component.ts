import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportService } from 'src/app/services/report.service';
import { ReportFormDialogComponent } from './report-form-dialog/report-form-dialog.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent {
  reports$ = this.reportsService.reports$;
  displayedColumns: string[] = [
    'code',
    'product',
    'toReproduce',
    'reproducibility',
    'comment',
    'actions',
  ];

  constructor(
    private reportsService: ReportService,
    private dialog: MatDialog
  ) {
    this.reportsService.getReports();
  }

  setReport(id: string | null = null) {
    this.dialog.open(ReportFormDialogComponent, {
      width: '450px',
      data: id,
    });
  }

  deleteReport(id: string | null) {
    this.reportsService.deleteReport(id);
  }
}
