import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Category } from '../../Shared/models/category.model';

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

  addCategory(categoryData: any): Observable<any> {
    return this.apiService.postTypeRequest(this.url + 'Add', categoryData);
  }

  updateCategory(categoryID: number, categoryData: any): Observable<any> {
    return this.apiService.putTypeRequest(
      this.url + '/Update?id=' + categoryID,
      categoryData
    );
  }

  deleteCategory(id: number): Observable<any> {
    console.log('deletecat');

    return this.apiService.deleteTypeRequest(this.url + 'Delete?id=' + id);
  }
}
