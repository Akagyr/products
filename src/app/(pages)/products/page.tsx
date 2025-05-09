import ProductsPageContainer from '@/app/components/products/ProductsPageContainer';
import {
  getProductsWithSpeciesId,
  getProducts,
  getNewProducts,
  getProductsWithCategoryId,
  getSearchProducts,
} from '@/app/database/prismaQuries';
import { Product } from '@/app/types';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; species?: string; new?: string; query?: string };
}) {
  let products: Product[] = [];

  if (searchParams.category) {
    products = (await getProductsWithCategoryId(searchParams.category)) as Product[];
  } else if (searchParams.species) {
    products = (await getProductsWithSpeciesId(searchParams.species)) as Product[];
  } else if (searchParams.new) {
    products = (await getNewProducts()) as Product[];
  } else if (searchParams.query) {
    products = (await getSearchProducts(searchParams.query)) as Product[];
  } else {
    products = (await getProducts()) as Product[];
  }

  return <ProductsPageContainer products={products} />;
}
