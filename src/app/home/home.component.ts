import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { CartService } from '../Services/cart.service';
import { CommonModule } from '@angular/common';
import { Cart } from '../../Shared/models/cart.model';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

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
  readonly APIAddress = environment.APIAddress.replace('/api/', '/MainFile/');

  //constructure
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
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
    if (localStorage.getItem('token')!=null) {
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
    this.router.navigate(['/login']);
  }
}
