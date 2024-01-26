import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../Services/category.service';
import { Categories, Category } from '../../Shared/models/category.model';
import { RouterModule } from '@angular/router';
import { CartService } from '../Services/cart.service';

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

  constructor(
    private categoryService: CategoryService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllProducts().subscribe((data) => {
      this.categories = JSON.parse(data);
    });
    this.GetProductCount(1);
  }

  public GetProductCount(id: number): void {
    this.cartService.getProductByUserID(id).subscribe((data) => {
      this.carts = JSON.parse(data);
      this.productCount = this.carts.length;
    });

  }
}
