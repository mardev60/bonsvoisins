import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { FirstConnectionFormComponent } from './pages/first-connection-form/first-connection-form.component';
import { HomeComponent } from './pages/home/home.component';
import { FirstTimeGuard } from './core/guards/first-time.guard';
import { ProfilComponent } from './pages/profil/profil.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { MealSuggestionComponent } from './pages/meal-suggestion/meal-suggestion.component';
import { NonFirstTimeGuard } from './core/guards/non-first-time.guard';
import { CreateMealComponent } from './pages/create-meal/create-meal.component';
MealSuggestionComponent

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    {path: 'welcome', component: FirstConnectionFormComponent, canActivate: [FirstTimeGuard]}, 
    {path: 'home', component: HomeComponent, canActivate: [NonFirstTimeGuard]},
    {path: 'collecter', component: CollectionComponent, canActivate: [NonFirstTimeGuard]},
    {path: 'proposer', component: MealSuggestionComponent, canActivate: [NonFirstTimeGuard]},
    {path: 'profil', component: ProfilComponent, canActivate: [NonFirstTimeGuard]},
    {path: 'nouveau-repas', component: CreateMealComponent, canActivate: [NonFirstTimeGuard]}
  ]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }