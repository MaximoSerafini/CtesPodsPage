export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  stock: number; // Nuevo campo para el límite de stock
}