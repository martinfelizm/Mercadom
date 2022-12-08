import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AdminLayoutComponent } from './core/layouts/admin-layout/admin-layout.component';
const routes: Routes = [
  //{path:'home', component: HomeComponent},
 // {path:'login', component: LoginComponent},
 // {path: '', pathMatch:'full', redirectTo:'login'},
  
  { path: '', redirectTo: 'dashboard', pathMatch: 'full',  }, 
  {
    path: '', component: AdminLayoutComponent, children: [{
      path: '',
      loadChildren: './core/layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
