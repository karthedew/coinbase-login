import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// --- APPLICATION PAGES ---
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { RedirectComponent } from "./pages/redirect/redirect.component";

// --- AUTHENTICATION ---
import { AuthGuardService } from "./core/auth/guards/auth.guard";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    data: { title: 'Home Component'},
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    data: { title: 'Login Component' }

  },
  {
    path:'redirect',
    component: RedirectComponent,
    data: { title: 'Redirect Component' }
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard Component' },
    canActivate: [ AuthGuardService ]
  },
  {
    path:'userprofile',
    component: UserProfileComponent,
    data: { title: 'User Profile' },
    canActivate: [ AuthGuardService ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
