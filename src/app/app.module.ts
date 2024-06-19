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

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot({
    swipeBackEnabled: false
  }), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    provideHttpClient(withInterceptors([
      errorInterceptor
    ])), 
    CategoryService,
    AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
