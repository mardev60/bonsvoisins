import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/services/interceptors/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirstConnectionFormComponent } from './pages/first-connection-form/first-connection-form.component';
import { HomeComponent } from './pages/home/home.component';
import { environment as env } from '../environments/environment.development';
import { provideAuth0 } from '@auth0/auth0-angular';
import { LocationSelectorComponent } from './components/location-selector/location-selector.component';
import { CollecteComponent } from './pages/collecte/collecte.component';
import { ProposerUnPlatComponent } from './pages/proposer-un-plat/proposer-un-plat.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { MealCardComponent } from './meal-card/meal-card.component';
import { MealsListComponent } from './components/meals-list/meals-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DashboardComponent,
    NavbarComponent,
    FirstConnectionFormComponent,
    HomeComponent,
    LocationSelectorComponent,
    CollecteComponent,
    ProposerUnPlatComponent,
    ProfilComponent,
    MealCardComponent,
    MealsListComponent,
    CollecteComponent,
    ProposerUnPlatComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: 
  [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    },
    provideAuth0(env.auth0)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
