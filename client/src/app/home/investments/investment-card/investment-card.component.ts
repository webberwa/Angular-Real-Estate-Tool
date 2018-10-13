import { InvestmentsService } from './../investments.service';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-investment-card',
  templateUrl: './investment-card.component.html',
  styleUrls: ['./investment-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InvestmentCardComponent implements OnInit {
  @Input()
  investment;
  constructor(private investmentsService: InvestmentsService) {}

  ngOnInit() {}
}
