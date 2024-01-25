import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { CategoryService } from '../Services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  //fields
  products: any[] = [];
  category: string = 'Tüm Ürünler';

  //constructure
  constructor(
    private productService: ProductService,
    private categoriService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.category = params['categoryName'];
      console.log(params);

      if (id) {
        this.productService.getProductsByCategory(id).subscribe((data) => {
          this.products = JSON.parse(data);
        });
      } else {
        this.getAllProducts();
      }
    });
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = JSON.parse(data);
    });
  }
}
