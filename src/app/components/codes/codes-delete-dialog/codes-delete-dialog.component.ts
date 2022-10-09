import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { CodesService } from 'src/app/services/codes.service';

@Component({
  selector: 'app-codes-delete-dialog',
  templateUrl: './codes-delete-dialog.component.html',
  styleUrls: ['./codes-delete-dialog.component.css'],
})
export class CodesDeleteDialogComponent {
  codeId = '';
  affected = 0;
  constructor(
    private codeService: CodesService,
    public dialogRef: MatDialogRef<CodesDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: string | null
  ) {
    if (data) {
      this.codeId = data;
      this.codeService.affects(this.codeId).subscribe((result) => {
        this.affected = result;
      });
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
  onClick() {
    this.codeService.deleteCode(this.codeId);
    this.dialogRef.close();
  }
}
