import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { OrderService } from './../../Services/order.service';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-admin-edit-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-edit-order.component.html',
  styleUrl: './admin-edit-order.component.css',
})
export class AdminEditOrderComponent {
  //   <tr>
  //   <th scope="col">Ürün</th>
  //   <th scope="col">Ürün Adı</th>
  //   <th scope="col">Sipariş Sahibi Kullanıcıadı</th>
  //   <th scope="col">Sipariş Sahibi Telefonu</th>
  //   <th scope="col">Sipariş Adedi</th>
  //   <th scope="col">Adress</th>
  //   <th scope="col">Sipariş Durumu</th>

  // </tr>

  modelView: any[] = [];
  orders: any[] = [];
  products: any[] = [];
  users: any[] = [];
  selectedStatus: any;

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.orderService.GetAllOrder().subscribe((data) => {
      this.orders = JSON.parse(data);
      console.log(this.orders);
    });

    this.productService.getAllProducts().subscribe((data) => {
      this.products = JSON.parse(data);
      console.log(this.products);
    });

    this.userService.GetAllUser().subscribe((data) => {
      this.users = JSON.parse(data);
      console.log(this.users);
    });

    const orderViewModelList = this.orders.map((order) => {
      const product = this.products.find(
        (p) => p.productID === order.productID
      );
      const user = this.users.find((u) => u.userID === order.userID);

      return {
        productName: product ? product.productName : '',
        imageURL: product ? product.imageURL : '',
        userName: user ? user.username : '',
        phoneNumber: user ? user.phoneNumber : 0,
        address: user ? user.address : '',
        orderStatus: order.orderStatus || '',
        quantity: order.quantity || 0,
      };
    });
    this.modelView = orderViewModelList;
  }

  onSelectStatus(event: Event) {}
}
