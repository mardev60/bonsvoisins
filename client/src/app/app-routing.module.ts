import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { FirstConnectionFormComponent } from './pages/first-connection-form/first-connection-form.component';
import { HomeComponent } from './pages/home/home.component';
import { FirstTimeGuard } from './core/guards/first-time.guard';
import { CollecteComponent } from './pages/collecte/collecte.component';
import { ProposerUnPlatComponent } from './pages/proposer-un-plat/proposer-un-plat.component';
import { ProfilComponent } from './pages/profil/profil.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    {path: 'welcome', component: FirstConnectionFormComponent, canActivate: [FirstTimeGuard]}, 
    {path: 'home', component: HomeComponent},
    {path: 'collecte', component: CollecteComponent},
    {path: 'proposer', component: ProposerUnPlatComponent},
    {path: 'profil', component: ProfilComponent},
  ]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }