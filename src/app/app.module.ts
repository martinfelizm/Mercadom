import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { UsersService } from './core/services/users.service';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './modules/components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { UserProfileComponent } from './modules/components/user-profile/user-profile.component';
import { TableListComponent } from './modules/components/table-list/table-list.component';
import { TypographyComponent } from './modules/components/typography/typography.component';
import { IconsComponent } from './modules/components/icons/icons.component';
import { MapsComponent } from './modules/components/maps/maps.component';
import { ProductsComponent } from './shared/components/products/products.component';
import { NotificationsComponent } from './modules/components/notifications/notifications.component';
import { UpgradeComponent } from './modules/components/upgrade/upgrade.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductsService } from './core/services/products.service';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AuthGuard } from './core/guards/auth.guard';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './core/layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AboutUsComponent } from './core/about-us/about-us.component';
import { environment } from '../environments/environment';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import { ProductEditComponent } from './shared/components/product-edit/product-edit.component';
//import { NgxMaskModule, IConfig } from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { ConfigurationsComponent } from './shared/components/configurations/configurations.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'MercaDOM'),
    FormsModule,
    //NgxMaskModule.forRoot(),
    TextMaskModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AboutUsComponent,
    LoginComponent,
    //ProductsComponent,
    ProductEditComponent,

  ],
  providers: [
    ProductsService,
    {
      provide: 'CanAlwaysActivateGuard',
      useValue: () => {
        return true;
      }
    },AngularFireAuth,UsersService,AngularFirestore, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
