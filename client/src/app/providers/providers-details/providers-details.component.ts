import { ProvidersService } from './../providers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-providers-details',
  templateUrl: './providers-details.component.html',
  styleUrls: ['./providers-details.component.css']
})
export class ProvidersDetailsComponent implements OnInit {
  provider;
  constructor(
    private route: ActivatedRoute,
    private providersService: ProvidersService
  ) {
    route.paramMap.subscribe((res: any) => {
      console.log('subscribe');
      const providersId = res.params.id;
      this.provider = providersService.getProvider(providersId);
    });
  }

  ngOnInit() {
    console.log('on init');
  }
}
