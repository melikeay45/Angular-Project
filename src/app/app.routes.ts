import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginUserGuard } from '../guards/login-guard-user.guard';
import { NoLoginGuard } from '../guards/no-login.guard';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { NavbarComponent } from './navbar/NavbarComponent';
import { AdminEditProductComponent } from './admin/admin-edit-product/admin-edit-product.component';
import { LoginAdminGuard } from '../guards/login-guard-admin.guard';
import { NoAdminGuard } from '../guards/no-admin.guard';
import { AdminEditCategoryComponent } from './admin/admin-edit-category/admin-edit-category.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [NoAdminGuard] },

  { path: 'category/:id/:categoryName', component: HomeComponent },
  {
    path: 'shopping-card',
    component: CartComponent,
    canActivate: [LoginUserGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [LoginUserGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [NoLoginGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoLoginGuard],
  },
  {
    path: 'user-orders',
    component: UserOrdersComponent,
    canActivate: [LoginUserGuard],
  },

  {
    path: 'admineditProduct',
    component: AdminEditProductComponent,
    canActivate: [LoginAdminGuard],
  },
  {
    path: 'admineditCategory',
    component: AdminEditCategoryComponent,
    canActivate: [LoginAdminGuard],
  },
];
