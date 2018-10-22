import { AuthenticationService } from './authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationComponent } from './authentication/authentication.component';

@Component({
  providers: [AuthenticationComponent, AuthenticationService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private authComp: AuthenticationComponent
  ) {}
  title = 'client';

  notification = 'notifications_active';
  alert_number = 15;

  ngOnInit() {}

  test_onClickNotification() {
    this.notification = 'notifications';
    this.alert_number = 0;
  }
}
