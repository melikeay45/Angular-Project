import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { CategoryService } from '../Services/category.service';
import { CartService } from '../Services/cart.service';
import { CommonModule } from '@angular/common';
import { Cart } from '../../Shared/models/cart.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  //fields
  products: any[] = [];
  category: string = 'Tüm Ürünler';

  //constructure
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.category = params['categoryName'];

      if (id) {
        this.productService.getProductsByCategory(id).subscribe((data) => {
          this.products = JSON.parse(data);
        });
      } else {
        this.getAllProducts();
      }
    });
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = JSON.parse(data);
    });
  }

  AddCart(productID: number, price: number): void {
    const myCart: Cart = {
      userID: 0,
      productID: productID,
      quantity: 1,
      price: price,
    };
    this.cartService.addCart(myCart).subscribe(
      (response) => {
        console.log('İstek başarılı:', response);
      },
      (error) => {
        console.error('İstek hatası:', error);
      }
    );
  }
}
