import { Apollo } from 'apollo-angular';
import { UserComponent } from '../../user/user.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../user/user.service';
import { AlertService } from '../alert/alert.service';
import { AlertComponent } from '../alert/alert.component';
import { MeGQL } from 'src/app/apollo-angular-services';

@Component({
  providers: [UserComponent, AlertComponent],
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {
  constructor(
    private apollo: Apollo,
    private user: UserService,
    private userComp: UserComponent,
    private alert: AlertService,
    private meGQL: MeGQL
  ) {}

  title = 'client';
  notification = 'notifications_active';
  alert_number = 15;

  ngOnInit() {}
}
