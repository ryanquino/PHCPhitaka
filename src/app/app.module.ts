import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './index/login/login.component';
import { RegisterComponent } from './index/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { NgxWebstorageModule } from "ngx-webstorage";
import { HomeModule } from 'src/app/home/home.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
