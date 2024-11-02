import HomePageContainer from './components/HomePageContainer';
import { Category, Product } from './types';

export default function Home() {
  const imageUrl =
    'https://cdn11.bigcommerce.com/s-3bp5t46z/images/stencil/586x586/products/545/2169/DSC_4003__32090.1625656671.jpg?c=2';

  const products: Product[] = [
    {
      id: 1,
      name: 'Токио',
      category: 'Токио',
      price: '$95.00',
      imageUrl: imageUrl,
    },
    {
      id: 2,
      name: 'Сакрифайс',
      category: 'Сакрифайс',
      price: '$160.00',
      imageUrl: imageUrl,
    },
    {
      id: 3,
      name: 'Пинк наоми',
      category: 'Пинк наоми',
      price: '$195.00',
      imageUrl: imageUrl,
    },
    {
      id: 4,
      name: 'Пикассо',
      category: 'Пикассо',
      price: '$195.00',
      imageUrl: imageUrl,
    },
  ];

  const categories: Category[] = [
    {
      id: 1,
      name: 'Токио',
    },
    {
      id: 2,
      name: 'Сакрифайс',
    },
    {
      id: 3,
      name: 'Пинк наоми',
    },
    {
      id: 4,
      name: 'Пикассо',
    },
  ];

  return (
    <HomePageContainer products={products} categories={categories} />
  );
}
