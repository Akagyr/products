import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/app/database/prismaQuries';

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    if (!orderData.userId || !orderData.total || !orderData.items || orderData.items.length === 0) {
      return NextResponse.json({ error: 'Missing required order data' }, { status: 400 });
    }

    const createdOrder = await createOrder(orderData);

    if (!createdOrder) {
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      order: createdOrder,
    });
  } catch (error) {
    console.error('Error in order API:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
