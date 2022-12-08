import { Routes } from '@angular/router';

import { DashboardComponent } from '../../../shared/components/dashboard/dashboard.component';
import { UserProfileComponent } from '../../../modules/components/user-profile/user-profile.component';
import { TableListComponent } from '../../../modules/components/table-list/table-list.component';
import { TypographyComponent } from '../../../modules/components/typography/typography.component';
import { IconsComponent } from '../../../modules/components/icons/icons.component';

//import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../../modules/components/notifications/notifications.component';
import { UpgradeComponent } from '../../../modules/components/upgrade/upgrade.component';
import { LoginComponent } from '../../../shared/components/login/login.component';
import { AdminLayoutComponent } from '../../../core/layouts/admin-layout/admin-layout.component';

export const LoginRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    
    { path: 'home', component: AdminLayoutComponent },
    { path: 'home', component: DashboardComponent }
];
