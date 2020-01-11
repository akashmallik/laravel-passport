import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
