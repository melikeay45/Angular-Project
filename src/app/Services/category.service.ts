import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  private url = 'CategoryApi/';

  getAllProducts(): Observable<any> {
    var data = this.apiService.getTypeRequest(this.url + 'GetAll');
    return data;
  }

  getSingleProduct(id: Number): Observable<any> {
    return this.apiService.getTypeRequest('Get' + id);
  }
}
