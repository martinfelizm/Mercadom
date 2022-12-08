import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './core/layouts/admin-layout/admin-layout.component';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { LoginComponent } from './shared/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes =[
 // { path: '', redirectTo: 'login', pathMatch: 'full',  }, 
  { path: 'login', component: LoginComponent}, 
 { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard] }, 
  {
    path: '', component: AdminLayoutComponent, canActivate: [AuthGuard] , children: [{
      path: '',
      loadChildren: './core/layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }
  ]}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
