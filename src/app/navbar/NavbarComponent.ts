import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../Services/category.service';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../Services/cart.service';
import { AuthService } from '../Services/auth.service';
import { interval } from 'rxjs';

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
  productCount: number = 10;
  isLogged: boolean = false;
  isDropdownOpen: boolean = false;
  userType: boolean = false;

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
    this.GetProductCount(1);

    interval(50).subscribe(() => {
      if (localStorage.getItem('token')) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }
  ngAfterViewInit(): void {
    this.isLogged = this.authService.isLoggedIn();
    //this.userType = this.authService.decodeToken.userType;
  }

  public GetProductCount(id: number): void {
    this.cartService.getProductByUserID(id).subscribe((data) => {
      this.carts = JSON.parse(data);
      this.productCount = this.carts.length;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
