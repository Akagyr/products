export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  orders?: Order[];
};

export type AuthSuccess = {
  success: true;
  user: User;
};

export type AuthError = {
  success: false;
  message: string;
};

export type AuthResult = AuthSuccess | AuthError;

export type Category = {
  id: string;
  name: string;
  image: string;
  createdAt: Date;
};

export type Species = {
  id: string;
  categoryId: string;
  category: Category;
  name: string;
  image: string;
  createdAt: Date;
};

export type Product = {
  id: string;
  categoryId: string;
  category: Category;
  speciesId: string;
  species: Species;
  name: string;
  images: string[];
  price: number;
  description: Description[];
  createdAt: Date;
};

export type Description = {
  id: string;
  productId: string;
  name: string;
  value: string;
};

export type ProductSearchResult = {
  id: string;
  species: {
    name: string;
  };
  name: string;
  price: number;
  image: string;
};

export type Order = {
  id: string;
  number: number;
  userId: string;
  status: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
};

export type OrderItem = {
  id: string;
  orderId: string;
  productName: string;
  productImage: string;
  productPrice: number;
};
