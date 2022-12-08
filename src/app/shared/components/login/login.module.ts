import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutes } from './login.routing';
import { DashboardComponent } from '../../../shared/components/dashboard/dashboard.component';
import { UserProfileComponent } from '../../../modules/components/user-profile/user-profile.component';
import { TableListComponent } from '../../../modules/components/table-list/table-list.component';
import { TypographyComponent } from '../../../modules/components/typography/typography.component';
import { IconsComponent } from '../../../modules/components/icons/icons.component';
//import { MapsComponent } from '../../maps/maps.component';
import { AdminLayoutComponent } from '../../../core/layouts/admin-layout/admin-layout.component';
import { NotificationsComponent } from '../../../modules/components/notifications/notifications.component';
import { UpgradeComponent } from '../../../modules/components/upgrade/upgrade.component';
import { LoginComponent } from '../../../shared/components/login/login.component';

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
    RouterModule.forChild(LoginRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    //  MapsComponent,
    LoginComponent,
    NotificationsComponent,
    UpgradeComponent,
  ]
})

export class AdminLayoutModule { }