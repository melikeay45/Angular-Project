import { Component } from '@angular/core';
import { OrderService } from '../Services/order.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../Services/product.service';
import { forkJoin } from 'rxjs';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css',
})
export class UserOrdersComponent {
  orders: any[] = [];
  orderProductViewModel: any[] = [];

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.orderService.GetOrderByUserID().subscribe((data) => {
      this.orders = JSON.parse(data);
      this.CreateOrderProduct(this.orders);
      this.orderProductViewModel.sort((a, b) => a.cartID - b.cartID);
    });
  }

  CreateOrderProduct(orders: any[]): void {
    let observables = [];

    for (let order of orders) {
      let productID = order.productID;
      observables.push(this.productService.getSingleProduct(productID));
    }

    forkJoin(observables).subscribe((productData: any[]) => {
      for (let i = 0; i < productData.length; i++) {
        let product = JSON.parse(productData[i]);
        let order = orders[i];
        this.orderProductViewModel.push({
          imageURL: product.imageURL,
          productName: product.productName,
          price: product.price,
          quantity: order.quantity,
          total: product.price * order.quantity,
          orderDate: order.orderDate,
          address: order.address,
        });
      }

      // Şimdi, tüm öğeler eklendikten sonra cartID'ye göre sıralama yapabilirsiniz
      this.orderProductViewModel.sort((a, b) => a.cartID - b.cartID);
    });
  }
}
