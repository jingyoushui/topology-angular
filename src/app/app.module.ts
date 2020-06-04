import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppHttpInterceptor } from './http/http.interceptor';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HotComponent } from './hot/hot.component';
import {LoginComponent} from './login/login.component';
import {NzButtonModule, NzCardModule, NzFormModule, NzGridModule, NzInputModule} from 'ng-zorro-antd';


@NgModule({
  declarations: [AppComponent, HotComponent,LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    CoreModule.forRoot(),
    AppRoutingModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzButtonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
