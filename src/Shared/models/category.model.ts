export interface Categories {
  count: number;
  products: Category[];
}

//eğer apiden bir tane veri gelirse
export interface Category {
  categoryID: number;
  categoryName: string;
  description: string;
  isDelete: boolean;
}
