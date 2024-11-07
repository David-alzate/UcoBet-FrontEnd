import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/Login/components/login/login.component';
import { RegisterCityComponent } from './modules/City/components/Register-City/register-city/register-city.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ListStatesComponent } from './modules/State/components/List-states/list-states/list-states.component';
import { ListCitiesComponent } from './modules/City/components/list-cities/list-cities/list-cities.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register-city', component: RegisterCityComponent, canActivate: [AuthGuard] },
  { path: 'list-states', component: ListStatesComponent, canActivate: [AuthGuard] },
  { path: 'list-cities', component: ListCitiesComponent, canActivate: [AuthGuard] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
