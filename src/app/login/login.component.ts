import { FormsModule } from '@angular/forms';
import { loginModel } from './../../Shared/models/login.model';
import { LoginService } from './../Services/login.service';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private loginservice: LoginService, private router: Router) {}

  _loginMdl: loginModel = new loginModel();

  login() {
    if (this._loginMdl.password.length <= 3) {
      alert('Lütfen şifrenizi giriniz');
      return;
    } else if (this._loginMdl.username.length <= 3) {
      alert('Lütfen kullanıcı adınızı giriniz');
      return;
    }

    this.loginservice.login(this._loginMdl).subscribe(
      (res) => {
        if (res.success) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('type', res.data.userType);

          this.router.navigate(['/']);
        } else {
          alert(res.message);
        }
      },
      (error) => {
        alert('Kontrol sırasında bilinmeyen bir hata meydana geldi.');
      }
    );
  }
}
