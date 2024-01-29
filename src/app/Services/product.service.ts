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

  uploadProductPicture(productId: number, file: File): Observable<any> {
    console.log(file);
    var data = this.apiService.postTypeRequest(
      `${this.url}UploadPicture=${productId}`,
      file
    );
    console.log(data);
    return data;
  }

  updateProduct(productData: any): Observable<any> {
    return this.http.post(this.APIAddress + 'ProductApi/Update', productData);
  }

  addProduct(productData: any): Observable<any> {
    return this.http.post(this.APIAddress + 'ProductApi/Add', productData);
  }
}
