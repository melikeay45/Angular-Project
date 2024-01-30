export interface Order {
  orderID:number;
  userID: number;
  totalAmount: number;
  orderDate: Date;
  orderStatus: string;
  phoneNumber: number;
  address: string;
  quantity: number;
  productID: number;
  unitPrice: number;
  isDelete:boolean;
}
