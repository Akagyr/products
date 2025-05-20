import { prisma } from '@/app/database/prisma';

export async function createNewUser(name: string, email: string, password: string) {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

export async function findExistingUser(email: string) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    return existingUser;
  } catch (error) {
    console.error('Error existing user:', error);
  }
}

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

export async function getLimitSearchProducts(query: string) {
  try {
    return await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            species: {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        price: true,
        images: true,
        species: {
          select: {
            name: true,
          },
        },
      },
      take: 3,
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return null;
  }
}

export async function getSearchProducts(query: string) {
  try {
    return await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            species: {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      include: {
        species: true,
        category: true,
        description: true,
      },
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return null;
  }
}

export async function getProductsByIds(productIds: string[]) {
  try {
    return await prisma.product.findMany({
      where: {
        id: {
          in: productIds
        }
      },
      include: {
        species: true,
        category: true,
        description: true,
      }
    });
  } catch (error) {
    console.error('Error fetching products by IDs:', error);
    return null;
  }
}

export async function getOrdersCount() {
  try {
    return await prisma.order.count();
  } catch (error) {
    console.error('Error get orders count:', error);
    return null;
  }
}
