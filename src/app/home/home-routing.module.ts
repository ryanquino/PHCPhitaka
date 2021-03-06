import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/home/dashboard/dashboard.component';
import { AuthGuard }  from '../auth/auth.guard';
const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
