import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResult } from '../../Shared/models/system.model';
import { Order } from '../../Shared/models/order.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  readonly APIAddress = environment.APIAddress + 'OrderApi/';

  AddOrder(order: any): Observable<any> {
    return this.apiService.postTypeRequest('OrderApi/' + 'Add', order);
  }
  

  getUserByUserID(): Observable<ApiResult<string>> {
    return this.http.get<ApiResult<string>>(this.APIAddress + 'Get');
  }
}
