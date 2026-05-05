export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
