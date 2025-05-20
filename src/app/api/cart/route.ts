import { NextRequest, NextResponse } from 'next/server';
import { getProductsByIds } from '@/app/database/prismaQuries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids');

    if (!ids) {
      return NextResponse.json({ error: 'IDs parameter is required' }, { status: 400 });
    }

    const productIds = ids.split(',');
    const products = await getProductsByIds(productIds);

    if (!products) {
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in cart products API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
