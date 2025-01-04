import HomePageContainer from '@/app/components/HomePageContainer';
import { Category, Product } from '@/app/types';
import { prisma } from '@/app/database/prisma';

async function getProducts(category?: string) {
  if (category) {
    return await prisma.products.findMany({
      where: {
        category: category,
      },
    });
  }
  return await prisma.products.findMany();
}

async function getCategories() {
  const categories = await prisma.categories.findMany();
  return categories;
}

export default async function Products({ searchParams }: { searchParams: { category?: string } }) {
  const [products, categories] = (await Promise.all([
    getProducts(searchParams.category),
    getCategories(),
  ])) as [Product[], Category[]];

  return <HomePageContainer products={products} categories={categories} />;
}
