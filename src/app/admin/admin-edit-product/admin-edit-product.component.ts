import { Product } from './../../../Shared/models/product.model';
import { Category } from '../../../Shared/models/category.model';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../Services/category.service';

@Component({
  selector: 'app-admin-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-edit-product.component.html',
  styleUrl: './admin-edit-product.component.css',
})
export class AdminEditProductComponent {
  selectedFile: File | null = null;
  readonly APIAddress = environment.APIAddress.replace('/api/', '/MainFile/');
  products: Product[] = [];
  categories: any[] = [];
  selectedCategory: string = '';

  selectedProduct: Product = {
    productID: 0,
    categoryID: 0,
    productName: '',
    productDescriptinon: '',
    price: 0,
    stockQuantity: 0,
    imageURL: '',
    isDelete: false,
    categoryName: '',
  };

  addProduct: Product = {
    productID: 0,
    categoryID: 0,
    productName: '',
    productDescriptinon: '',
    price: 0,
    stockQuantity: 0,
    imageURL: '',
    isDelete: false,
    categoryName: '',
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = JSON.parse(data);
    });
  }

  //Ürün güncelleme modalını açar
  openModal(productId: number) {
    var _product = this.products.find((x) => x.productID == productId);
    if (_product) {
      this.selectedProduct = _product;
    }
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    formData.append('productID', this.selectedProduct.productID.toString());
    formData.append('productName', this.selectedProduct.productName);
    formData.append(
      'productDescription',
      this.selectedProduct.productDescriptinon
    );
    formData.append('price', this.selectedProduct.price.toString());

    this.productService.updateProduct(formData).subscribe(
      (response) => {
        console.log('Ürün başarıyla güncellendi.', response);
        location.reload();
      },
      (error) => {
        console.error('Bir hata oluştu.', error);
      }
    );
  }

  onAddProductSubmit() {
    var category = this.categories.find(
      (x) => x.categoryName == this.selectedCategory
    );
    const _formData = new FormData();
    if (this.selectedFile) {
      _formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    _formData.append('productName', this.addProduct.productName);
    _formData.append('productDescription', this.addProduct.productDescriptinon);
    _formData.append('price', this.addProduct.price.toString());
    _formData.append('categoryID', category.categoryID.toString());
    this.productService.addProduct(_formData).subscribe(
      (response) => {
        console.log('Ürün başarıyla yüklendi.', response);
        location.reload();
      },
      (error) => {
        console.error('Bir hata oluştu.', error);
      }
    );
  }

  openAddModal() {
    this.categoryService.getAllProducts().subscribe((data) => {
      this.categories = JSON.parse(data);
    });
  }

  onSelectCategory(event: Event) {
    if (event && event.target) {
      const target = event.target as HTMLSelectElement;
      this.selectedCategory = target.value;
    }
  }
}
