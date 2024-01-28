import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginGuard } from '../guards/login-guard.guard';
import { NoLoginGuard } from '../guards/no-login.guard';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:id/:categoryName', component: HomeComponent },
  {
    path: 'shopping-card',
    component: CartComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [LoginGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [NoLoginGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoLoginGuard],
  },
];
