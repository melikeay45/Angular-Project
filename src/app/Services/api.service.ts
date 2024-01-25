import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //Fields
  baseUrl = 'https://localhost:44335/api/';

  //Constructure
  constructor(private http: HttpClient) {}

  //Methods


  getTypeRequest(url: string) {
    return this.http.get(`${this.baseUrl}${url}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  postTypeRequest(url: string, payload: any) {
    return this.http.post(`${this.baseUrl}${url}`, payload).pipe(
      map((res) => {
        return res;
      })
    );
  }

  putTypeRequest(url: string, payload: any) {
    return this.http.put(`${this.baseUrl}${url}`, payload).pipe(
      map((res) => {
        return res;
      })
    );
  }

  deleteTypeRequest(url: string) {
    return this.http.delete(`${this.baseUrl}${url}`).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
