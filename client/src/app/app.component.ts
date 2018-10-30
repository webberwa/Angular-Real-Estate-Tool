import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { NavComponent } from './site/nav/nav.component';
import { UserService } from './user/user.service';
import { DOCUMENT } from '@angular/common';

@Component({
  providers: [NavComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private user: UserService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        if (router.url === '/') {
          this.document.body.classList.add('Home-body');
        } else {
          this.document.body.classList.remove('Home-body');
        }
      }
    });
  }

  ngOnInit() {}
}
