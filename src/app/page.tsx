import HomePageContainer from './components/HomePageContainer';
import { Category, Product } from './types';
import { prisma } from './database/prisma';

async function getProducts() {
  const products = await prisma.products.findMany();
  return products;
}

async function getCategories() {
  const categories = await prisma.categories.findMany();
  return categories;
}

export default async function Home() {
  const [products, categories] = (await Promise.all([getProducts(), getCategories()])) as [
    Product[],
    Category[]
  ];

  return <HomePageContainer products={products} categories={categories} />;
}
