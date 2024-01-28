import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  user: any = {
    name: '',
    surname: '',
    username: '',
    password: '',
    email: '',
    address: '',
    phoneNumber: 0,
    isDelete: false,
    userType: true,
  };

  constructor(private userService: UserService) {}

  SignUp(): void {
    this.userService.AddUser(this.user).subscribe(
      (response) => {
        console.log(this.user);
        console.log('İstek başarılı:', response);
      },
      (error) => {
        console.error('İstek hatası:', error);
      }
    );
  }
}
