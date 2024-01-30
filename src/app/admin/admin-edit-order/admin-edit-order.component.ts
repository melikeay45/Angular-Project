import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { OrderService } from './../../Services/order.service';
import { ProductService } from '../../Services/product.service';
import { OrderViewModel } from '../../../Shared/ViewModel/orderViewModel';
import { forkJoin } from 'rxjs';
import { environment } from '../../../environments/environment';

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
  orderViewModelList: OrderViewModel[] = [];
  readonly APIAddress = environment.APIAddress.replace('/api/', '/MainFile/');
  orderStatus: string[] = [
    'siparişiniz alındı.',
    'Siparişiniz hazırlanıyor.',
    'Siparişiniz kargoya verildi.',
    'Siparişiniz teslim edildi.',
  ];

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    forkJoin({
      orders: this.orderService.GetAllOrder(),
      products: this.productService.getAllProducts(),
      users: this.userService.GetAllUser(),
    }).subscribe((data) => {
      this.orders = JSON.parse(data.orders);
      this.products = JSON.parse(data.products);
      this.users = JSON.parse(data.users);

      this.orders.forEach((order) => {
        let product = this.products.find(
          (p) => p.productID === order.productID
        );
        let user = this.users.find((u) => u.userID === order.userID);

        if (product && user) {
          const orderViewModel: OrderViewModel = {
            orderID:order.orderID,
            productName: product.productName,
            imageURL: product.imageURL,
            userName: user.username,
            phoneNumber: user.phoneNumber,
            address: order.address,
            orderStatus: order.orderStatus,
            quantity: order.quantity,
          };

          this.orderViewModelList.push(orderViewModel);
        }
      });
    });
    console.log(this.orderViewModelList);
  }

  onSelectStatus(event: Event,orderID:number) {
    let _order=this.orders.find((x)=>x.orderID==orderID);
     
    if (event && event.target) {
      const target = event.target as HTMLSelectElement;
      _order.orderStatus = target.value;
    }
    this.orderService.updateOrder(_order.orderID,_order).subscribe(
      (response) => {
        location.reload();
      },
      (error) => {
        console.error('Bir hata oluştu.', error);
      }
    );
  }

}
