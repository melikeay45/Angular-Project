export interface CartProductViewModel {
  cartID: number;
  userID: number;
  productID: number;
  quantity: number;
  categoryID: number;
  productName: string;
  productDescriptinon: string;
  price: number;
  stockQuantity: number;
  imageURL: string;
  total: number;
}
