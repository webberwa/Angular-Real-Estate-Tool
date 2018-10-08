import { AuthenticationService } from './authentication/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  providers: [],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthenticationService) {}
  title = 'client';

  notification = 'notifications_active';
  alert_number = 15;

  ngOnInit() {}

  test_onClickNotification() {
    this.notification = 'notifications';
    this.alert_number = 0;
  }
}
