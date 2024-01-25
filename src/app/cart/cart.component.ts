import { Component } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { ProductService } from '../Services/product.service';
import { CommonModule } from '@angular/common';
import { CartProductViewModel } from '../../Shared/ViewModel/cartProductViewModel';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  carts: any[] = [];
  cartProductViewModel: CartProductViewModel[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.cartService.getProductByUserID(1).subscribe((data) => {
      this.carts = JSON.parse(data);
      console.log(this.carts);
      this.CreateCartProduct(this.carts);
      console.log(this.cartProductViewModel);
    });
  }

  CreateCartProduct(carts: any): void {
    for (let cart of carts) {
      let productID = cart.productID;
      let product;
      this.productService.getSingleProduct(productID).subscribe((data) => {
        product = JSON.parse(data);
        this.cartProductViewModel.push({
          cartID: cart.cartID,
          userID: cart.userID,
          productID: product.productID,
          quantity: cart.quantity,
          categoryID: product.categoryID,
          productName: product.productName,
          productDescriptinon: product.productDescriptinon,
          price: cart.price,
          stockQuantity: product.stockQuantity,
          imageURL: product.imageURL,
          total: cart.price * cart.quantity,
        });
      });
    }
  }

  DeleteCart(id: number): void {
    console.log('işlemburda');
    this.cartService.deleteCart(id);
  }
}
