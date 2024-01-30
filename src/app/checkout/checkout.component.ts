import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartProductViewModel } from '../../Shared/ViewModel/cartProductViewModel';
import { CartService } from '../Services/cart.service';
import { ProductService } from '../Services/product.service';
import { forkJoin } from 'rxjs';
import { Order } from '../../Shared/models/order.model';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../Services/order.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {

  readonly APIAddress = environment.APIAddress.replace('/api/', '/MainFile/');


  constructor(
    private router: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  cartProductViewModel: CartProductViewModel[] = [];
  carts: any[] = [];
  totalPayment: number = 0;
  order: Order = {
    orderID:0,
    productID: 0,
    userID: 0,
    totalAmount: 0,
    orderDate: new Date(),
    orderStatus: '',
    phoneNumber: 0,
    address: '',
    quantity: 0,
    unitPrice: 0,
    isDelete:false
  };

  ngOnInit(): void {
    this.cartService.getProductByUserID().subscribe((data) => {
      this.carts = JSON.parse(data);
      this.CreateCartProduct(this.carts);
      this.cartProductViewModel.sort((a, b) => a.cartID - b.cartID);
    });
  }

  //Ekranda gösterilecek ürünleri oluşturur
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

      this.cartProductViewModel.sort((a, b) => a.cartID - b.cartID);
    });
  }

  PlaceOrder(): void {
    let orders: Order[] = [];
  
    for (let product of this.cartProductViewModel) {
      let _order: Order = {
        orderID:0,
        userID: 0,
        address: this.order.address,
        phoneNumber: this.order.phoneNumber,
        productID: product.productID,
        quantity: product.quantity,
        unitPrice: product.price,
        orderDate: new Date(),
        orderStatus: 'Sipariş oluşturuldu',
        totalAmount: product.price * product.quantity, // Tekil ürünün toplam fiyatını hesaplayın
        isDelete:false
      };
      orders.push(_order); // Her siparişi listeye ekleyin
    }
  
    this.orderService.AddOrder(orders).subscribe(
      (response) => {
        console.log('İstek başarılı:', response);
        
      },
      (error) => {
        console.error('İstek hatası:', error);
      }
    );

    this.cartService.DeleteAllCart().subscribe(
      (deleteResponse) => {
        console.log('Sepet başarıyla temizlendi:', deleteResponse);
      },
      (deleteError) => {
        console.error('Sepet temizleme hatası:', deleteError);
      }
    );
  }
  
}
