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
import { ProfilComponent } from './pages/profil/profil.component';
import { MealCardComponent } from './components/meal-card/meal-card.component';
import { MealsListComponent } from './components/meals-list/meals-list.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { MealSuggestionComponent } from './pages/meal-suggestion/meal-suggestion.component';
import { MealSuggestionHeaderComponent } from './components/meal-suggestion-header/meal-suggestion-header.component';
import { MealMobileCardComponent } from './components/meal-mobile-card/meal-mobile-card.component';
import { CommandCardComponent } from './components/command-card/command-card.component';
import { CommandGroupComponent } from './components/command-group/command-group.component';
import { PageInfoHeaderComponent } from './components/page-info-header/page-info-header.component';
import { PageInfoContentComponent } from './components/page-info-content/page-info-content.component';
import { PageInfoComponent } from './pages/page-info/page-info.component';
import { StoreModule } from '@ngrx/store';
import { navigationReducer } from './store/navigation.reducer';
import { FormatDateTimePipe } from './utils/pipes/format-date-time.pipe';
import { CreateMealComponent } from './pages/create-meal/create-meal.component';
import { FormulaireComponent } from './components/formulaire/formulaire.component';
import { ChatComponent } from './pages/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DashboardComponent,
    NavbarComponent,
    FirstConnectionFormComponent,
    HomeComponent,
    LocationSelectorComponent,
    ProfilComponent,
    MealCardComponent,
    MealsListComponent,
    CollectionComponent,
    MealSuggestionComponent,
    ProfilComponent,
    MealSuggestionHeaderComponent,
    MealMobileCardComponent,
    CommandCardComponent,
    CommandGroupComponent,
    PageInfoHeaderComponent,
    PageInfoContentComponent,
    PageInfoComponent,
    FormatDateTimePipe,
    CreateMealComponent,
    FormulaireComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ navigationData: navigationReducer }),
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
