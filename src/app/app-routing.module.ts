import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/index/login/login.component';
import { RegisterComponent } from 'src/app/index/register/register.component';
import { DashboardComponent } from 'src/app/home/dashboard/dashboard.component';
import { AuthGuard }  from 'src/app/auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: 'login', pathMatch:"full"} ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
