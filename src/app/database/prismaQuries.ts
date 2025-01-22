import { prisma } from '@/app/database/prisma';

export async function getProducts(typeName: string) {
  return await prisma.product.findMany({
    where: {
      type: {
        name: typeName,
      },
    },
    include: {
      type: true,
    },
  });
}

export async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        type: true,
      },
    });
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

export async function getTypes() {
  const categories = await prisma.type.findMany();
  return categories;
}
