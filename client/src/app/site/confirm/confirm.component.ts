import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ProvidersService } from 'src/app/profile/providers/providers.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  public confirm = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>
  ) /*@Inject(MAT_DIALOG_DATA) public data: DialogData*/ {}

  ngOnInit() {}

  onDelete(): void {
    this.confirm = true;
    this.dialogRef.close();
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
