import { NextResponse } from 'next/server';
import { prisma } from '@/app/database/prisma';

export async function POST() {
  const categories = [
    {
      id: 'orhidei',
      name: 'Орхідеї',
      image: 'https://s1.1zoom.me/big0/122/Orchid_Many_465895.jpg',
    },
    {
      id: 'kimnatni_roslini',
      name: 'Кімнатні рослини',
      image: 'https://epicentrk.ua/upload/medialibrary/650/kimnatni_roslini_1.jpg',
    },
  ];

  const species = [
    {
      id: 'falenopsis',
      name: 'Фаленопсис',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPSY6bKZcOPNNkApfy3JcqCycg1pE9t9kbXr8Yv-xWynnuuHzfqTzQSqq-aJVYyf1pTtvGRi0bX7d45o0SW_Q90Q',
      categoryId: 'orhidei',
    },
    {
      id: 'cimbidium',
      name: 'Цимбідіум',
      image: 'https://movakvitiv.com/wp-content/uploads/2022/10/orkhideya-tsymbidium-bila.jpg',
      categoryId: 'orhidei',
    },
    {
      id: 'pafiopedilum',
      name: 'Пафіопедилум',
      image: 'https://cdn.asterias.od.ua/images/2/2-5-62-700x741.jpg',
      categoryId: 'orhidei',
    },
    {
      id: 'vanda',
      name: 'Ванда',
      image: 'https://static.tildacdn.com/tild6663-6365-4666-a566-636631626165/1-56-700x672.jpg',
      categoryId: 'orhidei',
    },
  ];

  const products = [
    {
      id: 'piestrolistnyi-pico-chip',
      name: 'Пестролистный Pico Chip',
      images: [
        'https://florium.ua/media/catalog/product/cache/2/file/9df78eab33525d08d6e5fb8d27136e95/f/a/falenopsis-pico-chip.jpg',
        'https://florium.ua/media/catalog/product/cache/2/file/9df78eab33525d08d6e5fb8d27136e95/f/i/file_229_39_1_1_1_1_1_1_1_1_1_2_1_1_1_2_1_1_1_1_1_1_2_1.jpg',
      ],
      price: 399,
      categoryId: 'orhidei',
      speciesId: 'falenopsis',
    },
    {
      id: 'miniflora-tess',
      name: 'Минифлора Tess',
      images: [
        'https://florium.ua/media/catalog/product/cache/2/file/9df78eab33525d08d6e5fb8d27136e95/o/r/orchid_tess.jpg',
        'https://florium.ua/media/catalog/product/cache/2/file/9df78eab33525d08d6e5fb8d27136e95/1/_/1_2_13.jpg',
      ],
      price: 319,
      categoryId: 'orhidei',
      speciesId: 'falenopsis',
    },
    {
      id: 'magic-vogel',
      name: 'Magic Vogel',
      images: [
        'https://florium.ua/media/catalog/product/cache/1/file/9df78eab33525d08d6e5fb8d27136e95/c/y/cymbidium_magic_vogel-1.jpg',
      ],
      price: 150,
      categoryId: 'orhidei',
      speciesId: 'cimbidium',
    },
    {
      id: 'wild-green',
      name: 'Wild Green',
      images: [
        'https://florium.ua/media/catalog/product/cache/1/file/9df78eab33525d08d6e5fb8d27136e95/o/r/orhideja-wild-green.jpg',
        'https://florium.ua/media/catalog/product/cache/1/file/9df78eab33525d08d6e5fb8d27136e95/1/_/1_2_44_2_1_1_22.jpg',
      ],
      price: 599,
      categoryId: 'orhidei',
      speciesId: 'cimbidium',
    },
    {
      id: 'vienierin-bashmachok',
      name: 'Венерин башмачок',
      images: [
        'https://florium.ua/media/catalog/product/cache/2/file/9df78eab33525d08d6e5fb8d27136e95/p/a/pafiopedilum.jpg',
      ],
      price: 150,
      categoryId: 'orhidei',
      speciesId: 'pafiopedilum',
    },
    {
      id: 'korol-artur',
      name: 'Король Артур',
      images: [
        'https://florium.ua/media/catalog/product/cache/2/file/9df78eab33525d08d6e5fb8d27136e95/p/a/paphiopedilum_king_arthur-1.jpg',
      ],
      price: 150,
      categoryId: 'orhidei',
      speciesId: 'pafiopedilum',
    },
    {
      id: 'askotsientrum',
      name: 'Аскоцентрум',
      images: [
        'https://florium.ua/media/catalog/product/cache/2/file/9df78eab33525d08d6e5fb8d27136e95/v/a/vanda-ascocentrum.jpg',
      ],
      price: 150,
      categoryId: 'orhidei',
      speciesId: 'vanda',
    },
    {
      id: 'rinkhostilis',
      name: 'Ринхостилис',
      images: [
        'https://florium.ua/media/catalog/product/cache/2/file/9df78eab33525d08d6e5fb8d27136e95/r/h/rhynchostylis.jpg',
      ],
      price: 150,
      categoryId: 'orhidei',
      speciesId: 'vanda',
    },
  ];

  const descriptions = [
    {
      name: 'Висота',
      value: '100 см',
      productId: 'piestrolistnyi-pico-chip',
    },
    {
      name: 'Діаметр',
      value: '15 см',
      productId: 'piestrolistnyi-pico-chip',
    },
    {
      name: 'Розмір горщика',
      value: '9 см',
      productId: 'piestrolistnyi-pico-chip',
    },
    {
      name: 'Висота',
      value: '100 см',
      productId: 'miniflora-tess',
    },
    {
      name: 'Діаметр',
      value: '15 см',
      productId: 'miniflora-tess',
    },
    {
      name: 'Розмір горщика',
      value: '9 см',
      productId: 'miniflora-tess',
    },
    {
      name: 'Висота',
      value: '100 см',
      productId: 'magic-vogel',
    },
    {
      name: 'Діаметр',
      value: '15 см',
      productId: 'magic-vogel',
    },
    {
      name: 'Розмір горщика',
      value: '9 см',
      productId: 'magic-vogel',
    },
    {
      name: 'Висота',
      value: '100 см',
      productId: 'wild-green',
    },
    {
      name: 'Діаметр',
      value: '15 см',
      productId: 'wild-green',
    },
    {
      name: 'Розмір горщика',
      value: '9 см',
      productId: 'wild-green',
    },
  ];

  try {
    // Создание категорий
    const createdCategories = await Promise.all(
      categories.map(async (category) => {
        return prisma.category.create({
          data: category,
        });
      })
    );

    // Создание видов
    const createdSpecies = await Promise.all(
      species.map(async (specie) => {
        const category = createdCategories.find((cat) => cat.id === specie.categoryId);

        if (!category) {
          throw new Error(`Категория "${specie.categoryId}" не найдена`);
        }

        return prisma.species.create({
          data: {
            id: specie.id,
            name: specie.name,
            image: specie.image,
            categoryId: category.id,
          },
        });
      })
    );

    // Создание продуктов
    const createdProducts = await Promise.all(
      products.map(async (product) => {
        const category = createdCategories.find((cat) => cat.id === product.categoryId);

        if (!category) {
          throw new Error(`Категория "${product.categoryId}" не найдена`);
        }

        const specie = createdSpecies.find(
          (specie) => specie.id === product.speciesId && specie.categoryId === category.id
        );

        if (!specie) {
          throw new Error(
            `Вид "${product.speciesId}" не найден в категории "${product.categoryId}"`
          );
        }

        return prisma.product.create({
          data: {
            id: product.id,
            name: product.name,
            images: product.images,
            price: product.price,
            categoryId: category.id,
            speciesId: specie.id,
          },
        });
      })
    );

    // Создание описаний
    await Promise.all(
      descriptions.map(async (desc) => {
        const product = createdProducts.find((prod) => prod.id === desc.productId);

        if (!product) {
          throw new Error(`Продукт "${desc.productId}" не найден`);
        }

        return prisma.description.create({
          data: {
            name: desc.name,
            value: desc.value,
            productId: product.id
          },
        });
      })
    );

    return NextResponse.json({ message: 'Categories created successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create categories' }, { status: 500 });
  }
}
