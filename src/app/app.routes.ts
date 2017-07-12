import {Routes, RouterModule, RouterOutlet, RouterLink, RouterLinkWithHref, RouterLinkActive} from "@angular/router";

import {HomeComponent} from "./components/home/home.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ModuleWithProviders} from "@angular/core";
import {OAuthCanActivate} from "./services/auth/auth.guard";
import {LoginRegisterCanActivate} from "./services/auth/login-register.guard";
import {ChatListComponent} from "./components/chat/chat-list/chat-list.component";
import {ChatToComponent} from "./components/chat/chat-to/chat-to.component";

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'chat',
    canActivate: [OAuthCanActivate],
    children: [
      {
        path: '',
        component: ChatListComponent
      },
      {
        path: ':dialogId',
        component: ChatToComponent
      }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginRegisterCanActivate]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginRegisterCanActivate]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
