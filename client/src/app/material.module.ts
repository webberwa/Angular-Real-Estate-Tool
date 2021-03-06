import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenu } from '@angular/material/menu';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {
  MatCardModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatNativeDateModule
} from '@angular/material';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BarRatingModule } from 'ngx-bar-rating';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatTabsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule,
    FlexLayoutModule,
    MatListModule,
    MatButtonToggleModule,
    BarRatingModule,
    MatAutocompleteModule,
    MatSelectModule,
    AgmCoreModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  declarations: [],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatBadgeModule,
    MatToolbarModule,
    MatDialogModule,
    MatGridListModule,
    MatInputModule,
    FlexLayoutModule,
    MatTabsModule,
    MatListModule,
    MatButtonToggleModule,
    BarRatingModule,
    MatAutocompleteModule,
    MatSelectModule,
    AgmCoreModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatTooltipModule,
    MatProgressBarModule
  ]
})
export class MaterialModule {
  public constructor(public matIconRegistry: MatIconRegistry) {
    // add custom material icons
    // matIconRegistry.registerFontClassAlias('fa');
  }
}
