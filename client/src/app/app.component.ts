import { AlertComponent } from './site/alert/alert.component';
import { Observable } from 'rxjs';
import { GET_LOCAL_USER } from './local-queries';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { AuthenticationService } from './authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AlertService } from './site/alert/alert.service';

@Component({
  providers: [AuthenticationComponent, AlertComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public alertData = {
    message: 'hi',
    panelClass: 'success'
  };
  constructor(
    private apollo: Apollo,
    private auth: AuthenticationService,
    private authComp: AuthenticationComponent,
    private alert: AlertService
  ) {}

  title = 'client';
  notification = 'notifications_active';
  alert_number = 15;
  isAuthenticated;
  me;

  ngOnInit() {}

  test_onClickNotification() {
    this.notification = 'notifications';
    this.alert_number = 0;
  }
}
