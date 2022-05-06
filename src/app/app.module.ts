import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryAuthService } from './auth/auth.inmemory.service';
import { InventoryModule } from './inventory/inventory.module';
import { ManagerModule } from './manager/manager.module';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PosModule } from './pos/pos.module';
import { UserModule } from './user/user.module';
import { LoginComponent } from './login/login.component';
import { SimpleDialogComponent } from './common/simple-dialog/simple-dialog.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    SimpleDialogComponent,
    NavigationMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ManagerModule,
    InventoryModule,
    PosModule,
    UserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: AuthService,
      useClass: InMemoryAuthService,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
