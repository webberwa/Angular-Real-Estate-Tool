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

const appRoutes: Routes = [
  { path: 'providers', component: ProvidersComponent },
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
    InvestmentsCreateDialogComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA7mvpUb9Mut9i8EVo8lQn6P1OIrU3-C5U',
      libraries: ['places']
    }),
    MaterialModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    ReactiveFormsModule,
    BrowserModule,
    GraphQLModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [InvestmentsCreateDialogComponent]
})
export class AppModule {}
