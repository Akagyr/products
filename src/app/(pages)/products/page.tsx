import ProductsPageContainer from '@/app/components/products/ProductsPageContainer';
import { getCategories, getProducts } from '@/app/database/prismaQuries';
import { Category, Product } from '@/app/types';

export default async function ProductsPage({ searchParams }: { searchParams: { category: string } }) {
  const [products, categories] = (await Promise.all([
    getProducts(searchParams.category),
    getCategories(),
  ])) as [Product[], Category[]];

  return <ProductsPageContainer products={products} categories={categories} />;
}
