import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: DishDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
