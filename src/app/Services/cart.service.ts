import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Cart } from '../../Shared/models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = 'CartApi/';

  constructor(private http: HttpClient, private apiService: ApiService) {}

  getProductByUserID(id: Number): Observable<any> {
    console.log(id);
    return this.apiService.getTypeRequest(
      this.url + 'GetbyUserID?userID=' + id
    );
  }

  addCart(cart: Cart): Observable<any> {
    return this.apiService.postTypeRequest(this.url + 'Add', cart);
  }
  deleteCart(id: number): Observable<any> {
    return this.apiService.deleteTypeRequest(this.url + 'Delete?id=' + id);
  }
}
