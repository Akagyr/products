import { prisma } from '@/app/database/prisma';

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
}

export async function getSpecies(categoryName: string) {
  try {
    return await prisma.species.findMany({
      where: {
        category: {
          name: categoryName,
        },
      },
      include: {
        category: true,
      },
    });
  } catch (error) {
    console.error('Error fetching species:', error);
    return null;
  }
}

export async function getProducts(speciesName: string) {
  try {
    return await prisma.product.findMany({
      where: {
        species: {
          name: speciesName,
        },
      },
      include: {
        species: true,
        category: true,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}

export async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        species: true,
        category: true,
      },
    });
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
