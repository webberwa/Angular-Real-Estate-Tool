import { Component, OnInit, Input } from '@angular/core';
import { ProvidersService } from '../providers.service';

@Component({
  selector: 'app-providers-review-snippet',
  templateUrl: './providers-review-snippet.component.html',
  styleUrls: ['./providers-review-snippet.component.scss']
})
export class ProvidersReviewSnippetComponent implements OnInit {
  @Input()
  provider;
  constructor(private providersService: ProvidersService) {}

  ngOnInit() {}
}
