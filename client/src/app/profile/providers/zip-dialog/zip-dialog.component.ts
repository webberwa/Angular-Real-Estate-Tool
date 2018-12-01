import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'zip-dialog',
  templateUrl: './zip-dialog.component.html',
  styleUrls: ['./zip-dialog.component.scss']
})
export class ZipDialogComponent implements OnInit {
  zipForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef) {
    this.zipForm = this.formBuilder.group({
      zip: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5)
        ])
      ]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.dialogRef.close(this.zipForm.get("zip").value);
  }

}
