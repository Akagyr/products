import ProductsPageContainer from '@/app/components/products/ProductsPageContainer';
import { getProducts } from '@/app/database/prismaQuries';
import { Product } from '@/app/types';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { species: string };
}) {
  const products = (await getProducts(searchParams.species)) as Product[];

  return <ProductsPageContainer products={products} />;
}
