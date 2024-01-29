import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Cart } from '../../Shared/models/cart.model';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = 'CartApi/';
  private cartUpdateSubject = new Subject<void>();

  constructor(private http: HttpClient, private apiService: ApiService) {}

  GetCartByID(id: number): Observable<any> {
    return this.apiService.getTypeRequest(this.url + 'Get?id=' + id);
  }

  getProductByUserID(): Observable<any> {
    return this.apiService.getTypeRequest(this.url + 'GetbyUserID');
  }

  // AddCart fonksiyonunda, cartUpdateSubject'e bir değişiklik olduğunda haber ver
  addCart(cart: Cart): Observable<any> {
    console.log('cartservice');

    return this.http
      .post<any>('https://localhost:44335/api/CartApi/Add', cart)
      .pipe(tap(() => this.cartUpdateSubject.next()));
  }

  // NavbarComponent'in bu değişiklikten haberdar olmasını sağlayan observable
  getCartUpdate(): Observable<void> {
    return this.cartUpdateSubject.asObservable();
  }

  DeleteAllCart(): Observable<any> {
    return this.apiService
      .deleteTypeRequest(this.url + 'DeleteAll')
      .pipe(tap(() => this.cartUpdateSubject.next()));
  }

  deleteCart(id: number): Observable<any> {
    return this.apiService.deleteTypeRequest(this.url + 'Delete?id=' + id);
  }

  //Sadece cart datasının quantity alanını günceller.
  UpdateCartQuantity(id: number, cart: Cart): Observable<any> {
    return this.apiService.putTypeRequest(this.url + 'Update?id=' + id, cart);
  }
}
