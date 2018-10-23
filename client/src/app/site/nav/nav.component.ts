import { Apollo } from 'apollo-angular';
import { UserComponent } from '../../user/user.component';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { AlertService } from '../alert/alert.service';
import { AlertComponent } from '../alert/alert.component';
import { SET_LOCAL_USER } from '../../local-queries';
import { MeGQL } from 'src/app/apollo-angular-services';

@Component({
  providers: [UserComponent, AlertComponent],
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
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

  ngOnInit() {
    console.log('nav component');
    // this.apollo
    //   .watchQuery({
    //     query: this.meGQL.document,
    //     fetchPolicy: 'network-only'
    //   })
    //   .valueChanges.subscribe((res: any) => {
    //     const user = res.data.me;
    //     console.log('meGQL', res);
    //     this.apollo
    //       .mutate({
    //         mutation: SET_LOCAL_USER,
    //         variables: {
    //           user
    //         }
    //       })
    //       .subscribe(_ => {
    //         console.log('mutate SET_LOCAL_USER');
    //       });
    //   });
  }

  test_onClickNotification() {
    this.notification = 'notifications';
    this.alert_number = 0;
  }
}
