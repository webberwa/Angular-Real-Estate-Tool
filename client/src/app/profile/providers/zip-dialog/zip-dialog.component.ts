import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'zip-dialog',
  templateUrl: './zip-dialog.component.html',
  styleUrls: ['./zip-dialog.component.scss']
})
export class ZipDialogComponent implements OnInit {
  zipForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialog) {
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

    this.dialogRef.afterAllClosed.subscribe(() => localStorage.setItem('wbit_has_zip_code', true));
  }

  ngOnInit() {
  }

  onSubmit() {
    localStorage.setItem('wbit_zip_code', this.zipForm.get("zip").value);

    this.dialogRef.closeAll();
  }

}
