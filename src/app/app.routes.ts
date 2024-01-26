import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ChackoutComponent } from './chackout/chackout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:id/:categoryName', component: HomeComponent },
  { path: 'shopping-card', component: CartComponent },
  { path: 'chackout', component: ChackoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
