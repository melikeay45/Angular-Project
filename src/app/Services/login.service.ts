import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from '../../Shared/models/system.model';
import { environment } from '../../environments/environment';
import { loginModel, returnLogin } from '../../Shared/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly APIAddress = environment.APIAddress;

  constructor(private http: HttpClient) {}

  login(loginModel: loginModel): Observable<ApiResult<returnLogin>> {
    return this.http.post<ApiResult<returnLogin>>(
      `${this.APIAddress}LoginApi/login`,
      loginModel
    );
  }
}
