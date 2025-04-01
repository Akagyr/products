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

export async function getSpecies(categoryId: string) {
  try {
    return await prisma.species.findMany({
      where: {
        categoryId: categoryId,
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

export async function getAllSpecies() {
  try {
    return await prisma.species.findMany({
      include: {
        category: true,
      },
    });
  } catch (error) {
    console.error('Error fetching all species:', error);
    return null;
  }
}

export async function getProducts() {
  try {
    return await prisma.product.findMany({
      include: {
        species: true,
        category: true,
        description: true,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}

export async function getProductsWithSpeciesId(speciesId: string) {
  try {
    return await prisma.product.findMany({
      where: {
        speciesId: speciesId,
      },
      include: {
        species: true,
        category: true,
        description: true,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}

export async function getProductsWithCategoryId(categoryId: string) {
  try {
    return await prisma.product.findMany({
      where: {
        categoryId: categoryId,
      },
      include: {
        species: true,
        category: true,
        description: true,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}

export async function getNewProducts() {
  try {
    return await prisma.product.findMany({
      include: {
        species: true,
        category: true,
        description: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}

export async function getProduct(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        species: true,
        category: true,
        description: true,
      },
    });
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
