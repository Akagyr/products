import { prisma } from '@/app/database/prisma';

export async function getProducts(category: string) {
  return await prisma.products.findMany({
    where: {
      category: category,
    },
  });
}

export async function getProduct(id: number) {
  try {
    const product = await prisma.products.findUnique({
      where: {
        id: id,
      },
    });
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getCategories() {
  const categories = await prisma.categories.findMany();
  return categories;
}
