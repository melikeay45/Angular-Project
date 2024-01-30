import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  mail = 'melike.ay45@gmail.com';
  login: boolean = localStorage.getItem("token") !== null;
  type: string = localStorage.getItem("type") !== null ? localStorage.getItem("type")! : "";  

}
