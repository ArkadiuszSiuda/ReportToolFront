import { Component, OnInit } from '@angular/core';
import { CodesService } from 'src/app/services/codes.service';
import { MatDialog } from '@angular/material/dialog';
import { CodeFormDialogComponent } from './code-form-dialog/code-form-dialog.component';
import { CodesDeleteDialogComponent } from './codes-delete-dialog/codes-delete-dialog.component';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.css'],
})
export class CodesComponent {
  codes$ = this.codesService.codes$;
  displayedColumns: string[] = ['name', 'description', 'actions'];

  constructor(private codesService: CodesService, private dialog: MatDialog) {
    this.codesService.getCodes();
  }

  setCode(id: string | null = null) {
    this.dialog.open(CodeFormDialogComponent, {
      width: '450px',
      data: id,
    });
  }

  deleteCode(id: string | null) {
    this.dialog.open(CodesDeleteDialogComponent, {
      width: '450px',
      data: id,
    });
  }
}
