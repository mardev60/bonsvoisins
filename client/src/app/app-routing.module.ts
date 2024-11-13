import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ProfilComponent } from './profil/profil.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfilComponent, canActivate: [AuthGuard] },
      { path: 'accueil', component: HomeComponent, canActivate: [AuthGuard] },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
