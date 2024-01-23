//ürünlerin tutulacağı modeller

//eğer apiden birden fazla veri geliyorsa bu şekilde tutulur;
export interface Products {
  count: number;
  products: Product[];
}

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
}
