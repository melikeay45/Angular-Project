import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Products } from '../../Shared/models/product.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  private url = 'ProductApi/';

  getAllProducts(): Observable<any> {
    return this.apiService.getTypeRequest(this.url + 'GetAll');
  }

  getSingleProduct(id: Number): Observable<any> {
    console.log(id);
    return this.apiService.getTypeRequest('Get' + id);
  }
}
