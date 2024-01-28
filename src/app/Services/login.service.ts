import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from '../../Shared/models/system.model';
import { environment } from '../../environments/environment';
import { loginModel } from '../../Shared/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly APIAddress = environment.APIAddress;

  constructor(private http: HttpClient) {}

  login(loginModel: loginModel): Observable<ApiResult<string>> {
    return this.http.post<ApiResult<string>>(
      `${this.APIAddress}LoginApi/login`,
      loginModel
    );
  }
}
