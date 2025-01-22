export type Category = {
  id: string;
  name: string;
  image: string;
};

export type Type = {
  id: string;
  categoryId: string;
  name: string;
  image: string;
  createdAt: Date;
};

export type Product = {
  id: string;
  typeId: string;
  name: string;
  category: string;
  images: string[];
  price: number;
  createdAt: Date;
  type: Type;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
