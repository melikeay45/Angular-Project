import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:id/:categoryName', component: HomeComponent },
  { path: 'shopping-card', component: CartComponent },
];
