import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../../shared/components/dashboard/dashboard.component';
import { UserProfileComponent } from '../../../modules/components/user-profile/user-profile.component';
import { TableListComponent } from '../../../modules/components/table-list/table-list.component';
import { TypographyComponent } from '../../../modules/components/typography/typography.component';
import { IconsComponent } from '../../../modules/components/icons/icons.component';
//import { MapsComponent } from '../../maps/maps.component';
import { ProductsComponent } from '../../../shared/components/products/products.component';
import { ProductsdetailsComponent } from '../../../shared/components/productsdetails/productsdetails.component';
import { NotificationsComponent } from '../../../modules/components/notifications/notifications.component';
import { UpgradeComponent } from '../../../modules/components/upgrade/upgrade.component';
import { ConfigurationsComponent } from '../../../shared/components/configurations/configurations.component';
import { LoginComponent } from '../../../shared/components/login/login.component';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    TextMaskModule,
    CurrencyMaskModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    //  MapsComponent,
   // LoginComponent,
    ProductsComponent,
    ProductsdetailsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ConfigurationsComponent,
  ]
})

export class AdminLayoutModule { }
