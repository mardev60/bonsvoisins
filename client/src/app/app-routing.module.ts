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
MealSuggestionComponent

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    {path: 'welcome', component: FirstConnectionFormComponent, canActivate: [FirstTimeGuard]}, 
    {path: 'home', component: HomeComponent},
    {path: 'collecter', component: CollectionComponent},
    {path: 'proposer', component: MealSuggestionComponent},
    {path: 'profil', component: ProfilComponent},
  ]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }