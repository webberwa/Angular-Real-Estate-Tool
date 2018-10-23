import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../providers/providers.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  myProviders;

  constructor(providers: ProvidersService) {
    this.myProviders = providers.myProviders;
  }

  ngOnInit() {}
}
