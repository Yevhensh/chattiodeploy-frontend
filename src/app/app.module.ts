// angular libs
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ComponentRef, Injector} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import {SampleService} from './shared/sample.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

// components
import {NavigationComponent} from './components/navigation/navigation.component';
import {MainComponent} from './components/main/main.component';
import {HomeComponent} from './components/home/home.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ChatListComponent} from './components/chat/chat-list/chat-list.component';
import {ProfileComponent} from './components/profile/profile.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {ChatToComponent} from './components/chat/chat-to/chat-to.component';
import {ChatListDialogComponent} from './components/chat/chat-list-dialog/chat-list-dialog.component';

// modules
import {MaterialModule} from './modules/material.module';

// services
import {OAuthCanActivate} from './services/auth/auth.guard'
import {AuthService} from "./services/auth/auth.service";
import {PermissionService} from "./services/auth/permission/permissions.service";
import {httpFactory} from "./services/auth/intercept/authIntepceptor.factory";
import {AuthHttpInterceptor} from "./services/auth/intercept/auth.interceptor";
import {LoginRegisterCanActivate} from "./services/auth/login-register.guard";
import {StompService} from "./services/stomp/stomp.service";
import {UserService} from "./services/user/user.service";
import {DialogService} from "./services/chat-dialog/chat-dialog.service";

// routing
import {routing} from './app.routes';
import { ChatToDialogComponent } from './components/chat/chat-to-dialog/chat-to-dialog.component';

@NgModule({
  declarations: [
    NavigationComponent,
    MainComponent,
    HomeComponent,
    NotFoundComponent,
    ChatListComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    ChatToComponent,
    ChatListDialogComponent,
    ChatToDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    routing
  ],
  entryComponents: [
    ChatListDialogComponent,
    ChatToDialogComponent
  ],
  providers: [SampleService, StompService, UserService, OAuthCanActivate, LoginRegisterCanActivate, AuthService,
    PermissionService, DialogService,
    {
      provide: AuthHttpInterceptor,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, AuthService]
    }],
  bootstrap: [MainComponent]
})

export class AppModule {
}
