import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CategoryService } from './service/domain/category.service';
import { errorInterceptor } from 'src/interceptors/error-interceptor';
import { AuthService } from './service/auth.service';
import { StorageService } from './service/storage.service';
import { ClientService } from './service/domain/client.service';
import { authInterceptor } from 'src/interceptors/auth-interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './service/domain/product.service';
import { CartService } from './service/domain/cart.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot({
    swipeBackEnabled: false
  }), AppRoutingModule, ReactiveFormsModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])), 
    CategoryService,
    AuthService,
    StorageService,
    ClientService,
    ProductService,
    CartService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
