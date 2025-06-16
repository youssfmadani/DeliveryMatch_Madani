import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AnnoncesListComponent } from './components/annonces/annonces-list/annonces-list.component';
import { AnnonceFormComponent } from './components/annonces/annonce-form/annonce-form.component';
import { AnnonceDetailsComponent } from './components/annonces/annonce-details/annonce-details.component';
import { DemandesListComponent } from './components/demandes/demandes-list/demandes-list.component';
import { DemandeFormComponent } from './components/demandes/demande-form/demande-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'annonces',
    children: [
      { path: '', component: AnnoncesListComponent, canActivate: [AuthGuard] },
      { path: 'new', component: AnnonceFormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'CONDUCTEUR' } },
      { path: ':id/edit', component: AnnonceFormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'CONDUCTEUR' } },
      { path: ':id/details', component: AnnonceDetailsComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'demandes',
    children: [
      { path: '', component: DemandesListComponent, canActivate: [AuthGuard] },
      { path: 'new', component: DemandeFormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'EXPEDITEUR' } }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 