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
