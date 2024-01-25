import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../Shared/models/product.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  private url = 'ProductApi/';

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
}
