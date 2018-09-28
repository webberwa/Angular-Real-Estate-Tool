import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor() {
  }

  notification = "notifications_active";
  alert_number = 15;

  test_onClickNotification() {
    this.notification = "notifications";
    this.alert_number = 0;

  }

}
