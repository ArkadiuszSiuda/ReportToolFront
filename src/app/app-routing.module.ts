import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './auth/guard/authentication.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CodesComponent } from './components/codes/codes.component';
import { ProductsComponent } from './components/products/products.component';
import { ReportComponent } from './components/report/report.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    //canActivate: [PreventAuthActionsGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    //canActivate: [PreventAuthActionsGuard],
  },
  {
    path: 'reports',
    component: ReportComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'codes',
    component: CodesComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: '',
    redirectTo: '/reports',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/reports',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
