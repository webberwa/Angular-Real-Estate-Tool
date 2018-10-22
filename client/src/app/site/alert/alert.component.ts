import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent implements OnInit {
  public message;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = data.message;
  }

  ngOnInit() {}
}
