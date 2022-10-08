import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Code } from 'src/app/models/code';
import { CodesService } from 'src/app/services/codes.service';

@Component({
  selector: 'app-code-form-dialog',
  templateUrl: './code-form-dialog.component.html',
  styleUrls: ['./code-form-dialog.component.css'],
})
export class CodeFormDialogComponent {
  codeForm = this.fb.group({
    name: '',
    description: '',
  });

  currentCode: Code | null = null;
  constructor(
    private fb: FormBuilder,
    private codeService: CodesService,
    public dialogRef: MatDialogRef<CodeFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: string | null
  ) {
    if (data) {
      codeService.getCode(data).subscribe((cd) => {
        this.currentCode = cd;
        this.codeForm.setValue({
          name: this.currentCode?.name,
          description: this.currentCode?.description,
        });
      });
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
  onClick() {
    let code = {
      name: this.codeForm.value.name!,
      description: this.codeForm.value.description!,
    };

    if (this.currentCode?.id) {
      this.codeService.updateCode(code, this.currentCode.id);
    } else {
      this.codeService.postCode(code);
    }

    this.dialogRef.close();
  }
}
