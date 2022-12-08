import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../shared/components/login/login.component';
import { ProductsComponent } from '../../shared/components/products/products.component';

@NgModule({
  declarations: [LoginComponent,ProductsComponent],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
