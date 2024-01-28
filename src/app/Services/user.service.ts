import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from '../../Shared/models/system.model';
import { environment } from '../../environments/environment';
import { User } from '../../Shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly APIAddress = environment.APIAddress + 'UserApi/';

  constructor(private http: HttpClient) {}

  getUserByUserID(): Observable<ApiResult<string>> {
    return this.http.get<ApiResult<string>>(this.APIAddress + 'Get');
  }
}
