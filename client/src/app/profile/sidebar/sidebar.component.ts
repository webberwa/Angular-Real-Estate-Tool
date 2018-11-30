import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  showInvestment() {
    document.getElementById('invest').style.display = 'inline-block';
    document.getElementById('2fa').style.display = 'none';
  }
  show2FA() {
    document.getElementById('2fa').style.display = 'inline-block';
    document.getElementById('invest').style.display = 'none';
  }
}
