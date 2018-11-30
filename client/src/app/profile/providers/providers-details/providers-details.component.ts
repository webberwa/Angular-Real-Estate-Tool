import {MatDialog} from '@angular/material';
import {ProvidersService} from './../providers.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AddReviewFormComponent} from '../../review/add-review-form/add-review-form.component';
import {UserService} from 'src/app/user/user.service';
import {EditformComponent} from 'src/app/editform/editform.component';

@Component({
  selector: 'app-providers-details',
  templateUrl: './providers-details.component.html',
  styleUrls: ['./providers-details.component.scss']
})
export class ProvidersDetailsComponent implements OnInit {
  loading = true;
  provider = null;
  isVerified = false;
  providersId;
  url;
  dialogRef;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public providersService: ProvidersService,
    public userService: UserService
  ) {
    route.paramMap.subscribe((res: any) => {
      this.providersId = res.params.id;
      providersService.getProvider(this.providersId)
        .subscribe((result) => {
          this.loading = false;
          this.provider = result;
          this.isVerified = this.provider.is_verified;
        });
    });
    this.url = window.location.href;
  }

  addReview() {
    this.dialog.open(AddReviewFormComponent, {
      data: {
        provider_id: this.providersId
      },
      width: '600px',
      autoFocus: false
    });
  }

  openEditProviderDialog() {
    if (false === this.userService.isAuthenticated) {
      return;
    }

    this.providersService.editID = this.providersId;
    console.log(this.providersId);
    this.dialogRef = this.dialog.open(EditformComponent, {
      width: '600px',
      autoFocus: false
    });
  }

  ngOnInit() {}

  convertMilliSecToDate(timestamp: String): String {
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString();
  }

  hasInvalidGeographicLocation(long, lat) {
    return Number.isNaN(parseInt(long, 10)) && Number.isNaN(parseInt(lat, 10));
  }

  verifyProvider() {
    this.isVerified = this.providersService.verifyProvider(this.providersId);
  }
}
