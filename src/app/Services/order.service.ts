import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResult } from '../../Shared/models/system.model';
import { Order } from '../../Shared/models/order.model';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private cartClearSubject = new Subject<void>();
  readonly APIAddress = environment.APIAddress + 'OrderApi/';

  constructor(private http: HttpClient, private apiService: ApiService) {}

  AddOrder(order: Order[]): Observable<any> {
    return this.apiService.postTypeRequest('OrderApi/' + 'Add', order);
  }

  // AddOrder(order: any): Observable<any> {
  //   console.log('cartservice');

  //   return this.http
  //     .post<any>('https://localhost:44335/api/OrderApi/Add', order)
  //     .pipe(tap(() => this.cartClearSubject.next()));
  // }

  // // NavbarComponent'in bu değişiklikten haberdar olmasını sağlayan observable
  // getCartClear(): Observable<void> {
  //   return this.cartClearSubject.asObservable();
  // }

  GetAllOrder():Observable<any>{
  return this.apiService.getTypeRequest('OrderApi/GetAll');
  }

  //Kullanıcı id sine göre siparişleri getirir
  GetOrderByUserID(): Observable<any> {
    return this.apiService.getTypeRequest('OrderApi/' + 'GetOrdersByUserID');
  }
}
