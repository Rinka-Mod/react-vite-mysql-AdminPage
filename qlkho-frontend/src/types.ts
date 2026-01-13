export interface CartItemType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

export interface ProductInput {
  name: string;
  price: number | string;
  quantity: number | string;
  image_url: string;
}