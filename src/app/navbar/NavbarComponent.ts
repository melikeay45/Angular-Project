import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../Services/category.service';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../Services/cart.service';
import { AuthService } from '../Services/auth.service';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  categories: any[] = [];
  carts: any[] = [];
  productCount: number = 0;
  isLogged: boolean = false;
  isAdmin: boolean = false;
  isDropdownOpen: boolean = false;
  userType: boolean = false;
  private cartUpdateSubscription: Subscription = new Subscription();

  constructor(
    private categoryService: CategoryService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  showDropdown() {
    this.isDropdownOpen = true;
  }

  hideDropdown() {
    this.isDropdownOpen = false;
  }

  ngOnInit(): void {
    this.categoryService.getAllProducts().subscribe((data) => {
      this.categories = JSON.parse(data);
    });
    this.GetProductCount();
    this.cartUpdateSubscription = this.cartService
      .getCartUpdate()
      .subscribe(() => {
        this.productCount = 0;
        this.GetProductCount();
      });

    interval(50).subscribe(() => {
      if (localStorage.getItem('token')) {
        this.isLogged = true;
        if (localStorage.getItem('type') == 'admin') {
          this.isAdmin = true;
        }
      } else {
        this.isAdmin = false;
        this.isLogged = false;
      }
    });
  }
  ngOnDestroy(): void {
    this.cartUpdateSubscription.unsubscribe();
  }

  public GetProductCount(): void {
    this.cartService.getProductByUserID().subscribe((data) => {
      this.carts = JSON.parse(data);
      for (let cart of this.carts) {
        this.productCount = this.productCount + cart.quantity;
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    this.router.navigate(['']);
  }
}
