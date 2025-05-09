import { getLimitSearchProducts } from '@/app/database/prismaQuries';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';

  if (query.length < 2) {
    return NextResponse.json({ products: [] });
  }

  try {
    const products = await getLimitSearchProducts(query);

    const formattedProducts = products!.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      species: product.species,
      image: product.images[0],
    }));

    return NextResponse.json({ products: formattedProducts });
  } catch (error) {
    console.error('Ошибка поиска:', error);
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}
