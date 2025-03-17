export interface Flavor {
  name: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  stock: number;
  flavors: Flavor[];
  selectedFlavorIndex?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFlavorIndex: number;
}