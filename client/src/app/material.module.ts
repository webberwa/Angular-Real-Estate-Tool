import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenu } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import {MatBadgeModule, MatListModule} from '@angular/material';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BarRatingModule } from 'ngx-bar-rating';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatBadgeModule,
    MatToolbarModule,
    MatDialogModule,
    MatGridListModule,
    MatInputModule,
    FlexLayoutModule,
    MatListModule,
    MatButtonToggleModule,
    BarRatingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAX7fa9BRbq56Ya3eU_z22lz4PBZHKvjP0'
    })
  ],
  declarations: [],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatBadgeModule,
    MatToolbarModule,
    MatDialogModule,
    MatGridListModule,
    MatInputModule,
    FlexLayoutModule,
    MatInputModule,
    FlexLayoutModule,
    MatListModule,
    MatButtonToggleModule,
    BarRatingModule,
    AgmCoreModule
  ]
})
export class MaterialModule {}
