//ürünlerin tutulacağı modeller

//eğer apiden bir tane veri gelirse
export interface Product {
  productID: number;
  categoryID: number;
  productName: string;
  productDescriptinon: string;
  price: number;
  stockQuantity: number;
  imageURL: string;
  isDelete: boolean;
  categoryName: string;
}
