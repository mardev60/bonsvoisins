import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { FirstConnectionFormComponent } from './pages/dashboard/first-connection-form/first-connection-form.component';
import { HomeComponent } from './pages/dashboard/home/home.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [{path: 'welcome', component: FirstConnectionFormComponent}, {path: 'home', component: HomeComponent}]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
