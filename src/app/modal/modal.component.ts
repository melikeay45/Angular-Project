import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../Services/product.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  product: any;
  selectedFile: File | null = null;
  readonly APIAddress = environment.APIAddress;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private productService: ProductService,
    private http: HttpClient
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }
  recordAndClose(): void {
    alert('Ürün başarıyla kaydedildi.');
    this.dialogRef.close(); // Modalı kapat
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post(this.APIAddress + 'ProductApi/Upload', formData).subscribe(
        (response) => console.log('Yükleme başarılı', response),
        (error) => console.error('Yüklenirken bir hata oluştu', error)
      );
    } else {
      console.error('Dosya seçilmedi.');
    }
  }
}
