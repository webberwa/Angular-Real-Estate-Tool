import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InvestmentsComponent } from './investments/investments.component';
import { ProvidersComponent } from './providers/providers.component';
import { InvestmentsCreateDialogComponent } from './investments/investments-create-dialog/investments-create-dialog.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginDialogComponent } from './authentication/login-dialog/login-dialog.component';
import { SignupDialogComponent } from './authentication/signup-dialog/signup-dialog.component';
import { HomeComponent } from './home/home.component';
import { FormatDirective } from './format.directive';
import { YearsPipe } from './years.pipe';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'investments', component: InvestmentsComponent },
  { path: 'providers', component: ProvidersComponent }
  // { path: 'hero/:id', component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // {
  //   path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    InvestmentsComponent,
    ProvidersComponent,
    InvestmentsCreateDialogComponent,
    AuthenticationComponent,
    LoginDialogComponent,
    SignupDialogComponent,
    HomeComponent,
    FormatDirective,
    YearsPipe
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA7mvpUb9Mut9i8EVo8lQn6P1OIrU3-C5U',
      libraries: ['places']
    }),
    MaterialModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    ReactiveFormsModule,
    BrowserModule,
    GraphQLModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    InvestmentsCreateDialogComponent,
    LoginDialogComponent,
    SignupDialogComponent
  ]
})
export class AppModule {}
