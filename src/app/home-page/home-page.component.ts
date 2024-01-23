import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../Services/product.service';
import { Products, Product } from '../../Shared/models/product.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  //fields
  products: Product[] = [];

  //constructure
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.productService.getAllProducts().subscribe(
        (res: any) => {
          console.log(res);
          this.products = res;
        },
        (err) => {
          console.log(err);
        }
      );
    }, 500);
  }
}
