import { AuthenticatedGuard } from './authenticated.guard';
import { AuthGuard } from './auth.guard';
import { InvestmentsCreateDialogComponent } from './investments/investments-create-dialog/investments-create-dialog.component';
import { InvestmentsComponent } from './investments/investments.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { UserComponent } from './user/user.component';
import { LoginDialogComponent } from './user/login-dialog/login-dialog.component';
import { SignupDialogComponent } from './user/signup-dialog/signup-dialog.component';
import { HomeComponent } from './home/home.component';
import { FormatDirective } from './format.directive';
import { YearsPipe } from './years.pipe';
import { ContainerComponent } from './site/container/container.component';
import uiMask from 'angular-ui-mask';
import { InvestmentCardComponent } from './investments/investment-card/investment-card.component';
import { ResetPasswordDialogComponent } from './user/reset-password-dialog/reset-password-dialog.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { AlertComponent } from './site/alert/alert.component';
import { NavComponent } from './site/nav/nav.component';
import { SettingsComponent } from './user/settings/settings.component';
import { TwoFactorCodeComponent } from './user/two-factor-code/two-factor-code.component';
import { ProfileComponent } from './profile/profile.component';
import { DialogOverviewExampleDialogComponent } from './profile/profile.component';
import { ConfirmDialogComponent } from './investments/investments.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxPhoneMaskModule } from 'ngx-phone-mask';

import { CreateProviderFormComponent } from './profile/create-provider-form/create-provider-form.component';
import { UserService } from './user/user.service';
import { UserGuard } from './user.guard';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { HitsComponent } from './search/hits/hits.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angular5-social-login';
import { EditformComponent } from './editform/editform.component';
import { InvestmentsDetailsComponent } from './investments/investments-details/investments-details.component';
import { ExpensesCreateComponent } from './investment/expenses-create/expenses-create.component';
import {
  CurrencyMaskConfig,
  CURRENCY_MASK_CONFIG
} from 'ng2-currency-mask/src/currency-mask.config';
import { CurrencyDirective } from './currency.directive';
import { PercentageDirective } from './percentage.directive';
import { ProvidersComponent } from './profile/providers/providers.component';
import { ProvidersDetailsComponent } from './profile/providers/providers-details/providers-details.component';
import { ProviderCardComponent } from './profile/providers/provider-card/provider-card.component';
import { SidenavComponent } from './site/sidenav/sidenav.component';
import { ProvidersReviewSnippetComponent } from './profile/providers/providers-review-snippet/providers-review-snippet.component';
import { SearchFilterComponent } from './profile/providers/search-filter/search-filter.component';
import { ReviewComponent } from './profile/review/review.component';
import { AddReviewFormComponent } from './profile/review/add-review-form/add-review-form.component';
import { Deletepop1Component } from './profile/profile/deletepop1/deletepop1.component';
import { AutoCompleteAddressDirective } from './auto-complete-address.directive';
import {ZipDialogComponent} from './profile/providers/zip-dialog/zip-dialog.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: false,
  decimal: '.',
  precision: 2,
  prefix: '$',
  suffix: '',
  thousands: ','
};

const appRoutes: Routes = [
  {
    path: '',
    // UserGuard loads user data before entering any route
    canActivate: [UserGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      {
        path: 'login',
        component: LoginDialogComponent,
        canActivate: [AuthenticatedGuard]
      },
      { path: 'two-factor', component: TwoFactorCodeComponent },
      {
        path: 'signup',
        component: SignupDialogComponent,
        canActivate: [AuthenticatedGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'investments',
        component: InvestmentsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'investments/:id',
        component: InvestmentsDetailsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'providers',
        component: ProvidersComponent
      },
      { path: 'providers/:id', component: ProvidersDetailsComponent },
      { path: 'review/:id', component: ReviewComponent }
    ]
  }
];

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('158673211754613')
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('Your-Google-Client-Id')
    }
  ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    InvestmentsComponent,
    ProvidersComponent,
    InvestmentsCreateDialogComponent,
    UserComponent,
    LoginDialogComponent,
    SignupDialogComponent,
    HomeComponent,
    FormatDirective,
    YearsPipe,
    InvestmentCardComponent,
    ContainerComponent,
    ReviewComponent,
    ResetPasswordDialogComponent,
    ResetPasswordComponent,
    AlertComponent,
    NavComponent,
    CreateProviderFormComponent,
    SettingsComponent,
    TwoFactorCodeComponent,
    ProfileComponent,
    ProviderCardComponent,
    ProvidersDetailsComponent,
    SidenavComponent,
    AddReviewFormComponent,
    ProvidersReviewSnippetComponent,
    SearchFilterComponent,
    EditformComponent,
    InvestmentsDetailsComponent,
    ExpensesCreateComponent,
    CurrencyDirective,
    PercentageDirective,
    Deletepop1Component,
    DialogOverviewExampleDialogComponent,
    ConfirmDialogComponent,
    AutoCompleteAddressDirective,
    ZipDialogComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA7mvpUb9Mut9i8EVo8lQn6P1OIrU3-C5U',
      libraries: ['places']
    }),
    NgxPhoneMaskModule,
    JwSocialButtonsModule,
    MaterialModule,
    CurrencyMaskModule,
    NgxMaskModule.forRoot({}),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    ReactiveFormsModule,
    BrowserModule,
    GraphQLModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    AngularFontAwesomeModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    InvestmentsCreateDialogComponent,
    LoginDialogComponent,
    SignupDialogComponent,
    ResetPasswordDialogComponent,
    AlertComponent,
    CreateProviderFormComponent,
    EditformComponent,
    AddReviewFormComponent,
    ExpensesCreateComponent,
    DialogOverviewExampleDialogComponent,
    ConfirmDialogComponent,
    ZipDialogComponent
  ]
})
export class AppModule {
  constructor(user: UserService) {
    user.updateAuthStatus();
  }
}
