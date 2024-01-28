import { Component } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { ProductService } from '../Services/product.service';
import { CommonModule } from '@angular/common';
import { CartProductViewModel } from '../../Shared/ViewModel/cartProductViewModel';
import { forkJoin } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  carts: any[] = [];
  cartProductViewModel: CartProductViewModel[] = [];
  totalPayment: number = 0;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getProductByUserID().subscribe((data) => {
      this.carts = JSON.parse(data);
      this.CreateCartProduct(this.carts);
      this.cartProductViewModel.sort((a, b) => a.cartID - b.cartID);
    });
  }

  CreateCartProduct(carts: any[]): void {
    let observables = [];

    for (let cart of carts) {
      let productID = cart.productID;
      observables.push(this.productService.getSingleProduct(productID));
    }

    forkJoin(observables).subscribe((productData: any[]) => {
      for (let i = 0; i < productData.length; i++) {
        let product = JSON.parse(productData[i]);
        let cart = carts[i];
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
        this.totalPayment = this.totalPayment + cart.price * cart.quantity;
      }

      // Şimdi, tüm öğeler eklendikten sonra cartID'ye göre sıralama yapabilirsiniz
      this.cartProductViewModel.sort((a, b) => a.cartID - b.cartID);
    });
  }

  //Sepetteki ürünü siler
  DeleteCart(id: number): void {
    this.cartService.deleteCart(id).subscribe(
      (response) => {
        console.log('İstek başarılı:', response);
        location.reload();
      },
      (error) => {
        console.error('İstek hatası:', error);
      }
    );
  }

  //Quantity artırır
  PlusQuantity(id: number): void {
    let cart: any;
    this.cartService.GetCartByID(id).subscribe((data) => {
      cart = JSON.parse(data);
      cart.quantity = cart.quantity + 1;
      this.cartService.UpdateCartQuantity(id, cart).subscribe(
        (response) => {
          console.log('İstek başarılı:', response);

          var quantity = this.cartProductViewModel.find((x) => x.cartID == id);
          if (quantity) {
            quantity.quantity = quantity.quantity + 1;
          }
        },
        (error) => {
          console.error('İstek hatası:', error);
        }
      );
    });
  }
  //Quantity azaltır
  MinusQuantity(id: number): void {
    let cart: any;
    this.cartService.GetCartByID(id).subscribe((data) => {
      cart = JSON.parse(data);
      //eğer quantity 1 e eşit ise sepetten sil
      if (cart.quantity == 1) {
        this.cartService.deleteCart(id).subscribe(
          (response) => {
            console.log('İstek başarılı:', response);

            this.cartProductViewModel = this.cartProductViewModel.filter(
              (x) => x.cartID != id
            );
          },
          (error) => {
            console.error('İstek hatası:', error);
          }
        );
      }
      //eğer quantity 1 den büyükse miktarı azaltır
      else {
        cart.quantity = cart.quantity - 1;
        this.cartService.UpdateCartQuantity(id, cart).subscribe(
          (response) => {
            console.log('İstek başarılı:', response);

            var quantity = this.cartProductViewModel.find(
              (x) => x.cartID == id
            );
            if (quantity) {
              quantity.quantity = quantity.quantity - 1;
            }
          },
          (error) => {
            console.error('İstek hatası:', error);
          }
        );
      }
    });
  }
}
