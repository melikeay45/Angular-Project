import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../Shared/models/product.model';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  private url = 'ProductApi/';
  readonly APIAddress = environment.APIAddress;

  getAllProducts(): Observable<any> {
    var data = this.apiService.getTypeRequest(this.url + 'GetAll');
    return data;
  }

  getSingleProduct(id: Number): Observable<any> {
    return this.apiService.getTypeRequest(this.url + 'Get?id=' + id);
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    var data = this.apiService.getTypeRequest(
      `${this.url}/GetByCategoryID?categoryID=${categoryId}`
    );
    return data;
  }
  updateProduct(productData: any): Observable<any> {
    return this.http.post(this.APIAddress + 'ProductApi/Update', productData);
  }

  addProduct(productData: any): Observable<any> {
    return this.http.post(this.APIAddress + 'ProductApi/Add', productData);
  }

  deleteProduct(productID:number):Observable<any>{
    return this.http.delete(this.APIAddress+'ProductApi/Delete?id='+productID);
  }
}
