import { BehaviorSubject, Observable } from 'rxjs';
import { AlertComponent } from './alert.component';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

interface AlertData {
  type: Alert;
  message: string;
}

export enum Alert {
  SUCCESS = 'success',
  ERROR = 'error'
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  open(data: AlertData) {
    // const data = {
    //   message: 'This is a message',
    //   type: Alert.SUCCESS
    // };
    this.snackBar.openFromComponent(AlertComponent, {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 1800,
      panelClass: [data.type],
      data: { message: data.message }
    });
  }
}
