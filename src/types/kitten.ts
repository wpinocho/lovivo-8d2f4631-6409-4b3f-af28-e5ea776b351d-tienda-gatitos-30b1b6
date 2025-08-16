export interface Kitten {
  id: string;
  name: string;
  breed: string;
  age: number; // en meses
  price: number;
  image: string;
  description: string;
  color: string;
  gender: 'male' | 'female';
  vaccinated: boolean;
  available: boolean;
}

export interface CartItem {
  kitten: Kitten;
  quantity: number;
}