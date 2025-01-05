import HomePageContainer from '@/app/components/HomePageContainer';
import { getCategories, getProducts } from '@/app/database/prismaQuries';
import { Category, Product } from '@/app/types';

export default async function ProductsPage({ searchParams }: { searchParams: { category: string } }) {
  const [products, categories] = (await Promise.all([
    getProducts(searchParams.category),
    getCategories(),
  ])) as [Product[], Category[]];

  return <HomePageContainer products={products} categories={categories} />;
}
