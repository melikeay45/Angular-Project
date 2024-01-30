import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../Services/category.service';
import { Category } from '../../../Shared/models/category.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-edit-category.component.html',
  styleUrl: './admin-edit-category.component.css',
})
export class AdminEditCategoryComponent {
  categories: Category[] = [];

  selectedCategory: Category = {
    categoryName: '',
    description: '',
    categoryID: 0,
    isDelete: false,
  };
  addCategory: Category = {
    categoryName: '',
    description: '',
    categoryID: 0,
    isDelete: false,
  };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAllProducts().subscribe((data) => {
      this.categories = JSON.parse(data);
    });
  }

  openModal(categoryID: number) {
    var category = this.categories.find((x) => x.categoryID == categoryID);
    if (category) {
      this.selectedCategory = category;
    }
  }

  onSubmit() {
    this.categoryService
      .updateCategory(this.selectedCategory.categoryID, this.selectedCategory)
      .subscribe(
        (response) => {
          location.reload();
        },
        (error) => {
          console.error('Bir hata oluştu.', error);
        }
      );
  }

  deleteCategory(id: number) {
    console.log('deletecat1');
    this.categoryService.deleteCategory(id).subscribe(
      (response) => {
        location.reload();
      },
      (error) => {
        console.error('Bir hata oluştu.', error);
      }
    );
  }
  openAddModal() {}

  onAddSubmit() {
    this.categoryService.addCategory(this.addCategory).subscribe(
      (response) => {
        location.reload();
      },
      (error) => {
        console.error('Bir hata oluştu.', error);
      }
    );
  }
}
