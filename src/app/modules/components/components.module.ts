import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from '../../core/footer/footer.component';
import { NavbarComponent } from '../../core/navbar/navbar.component';
import { SidebarComponent } from '../../core/sidebar/sidebar.component';
import { ProductsComponent } from '../../shared/components/products/products.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
