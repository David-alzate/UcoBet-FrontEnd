import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/Login/components/login/login.component';
import { RegisterCityComponent } from './modules/City/components/Register-City/register-city/register-city.component';

const routes: Routes = [  
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register-city', component: RegisterCityComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
