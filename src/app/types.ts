export type Product = {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  // images: string[];
  price: number;
  // discountPrice: number;
  // description: Description[];
  createdAt: number;
};

// export type Description = {
//   heigth: string;
// };

export type Category = {
  id: number;
  name: string;
};
