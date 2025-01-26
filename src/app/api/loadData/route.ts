import { NextResponse } from 'next/server';
import { prisma } from '@/app/database/prisma';

export async function POST() {
  const categories = [
    {
      name: 'Орхідеї',
      image: 'https://s1.1zoom.me/big0/122/Orchid_Many_465895.jpg',
    },
    {
      name: 'Кімнатні рослини',
      image: 'https://epicentrk.ua/upload/medialibrary/650/kimnatni_roslini_1.jpg',
    },
  ];

  const species = [
    {
      name: 'Фаленопсис',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPSY6bKZcOPNNkApfy3JcqCycg1pE9t9kbXr8Yv-xWynnuuHzfqTzQSqq-aJVYyf1pTtvGRi0bX7d45o0SW_Q90Q',
      categoryName: 'Орхідеї',
    },
    {
      name: 'Цимбідіум',
      image: 'https://movakvitiv.com/wp-content/uploads/2022/10/orkhideya-tsymbidium-bila.jpg',
      categoryName: 'Орхідеї',
    },
    {
      name: 'Пафіопедилум',
      image: 'https://cdn.asterias.od.ua/images/2/2-5-62-700x741.jpg',
      categoryName: 'Орхідеї',
    },
    {
      name: 'Ванда',
      image: 'https://static.tildacdn.com/tild6663-6365-4666-a566-636631626165/1-56-700x672.jpg',
      categoryName: 'Орхідеї',
    },
  ];

  const products = [
    {
      name: 'Пестролистный Pico Chip',
      images: [
        'https://florium.ua/media/catalog/product/cache/2/file/9df78eab33525d08d6e5fb8d27136e95/f/a/falenopsis-pico-chip.jpg',
        'https://florium.ua/media/catalog/product/cache/2/file/9df78eab33525d08d6e5fb8d27136e95/f/i/file_229_39_1_1_1_1_1_1_1_1_1_2_1_1_1_2_1_1_1_1_1_1_2_1.jpg',
      ],
      price: 399,
      categoryName: 'Орхідеї',
      speciesName: 'Фаленопсис',
    },
    {
      name: 'Минифлора Tess',
      images: [
        'https://florium.ua/media/catalog/product/cache/2/file/9df78eab33525d08d6e5fb8d27136e95/o/r/orchid_tess.jpg',
        'https://florium.ua/media/catalog/product/cache/2/file/9df78eab33525d08d6e5fb8d27136e95/1/_/1_2_13.jpg',
      ],
      price: 319,
      categoryName: 'Орхідеї',
      speciesName: 'Фаленопсис',
    },
    {
      name: 'Magic Vogel',
      images: [
        'https://florium.ua/media/catalog/product/cache/1/file/9df78eab33525d08d6e5fb8d27136e95/c/y/cymbidium_magic_vogel-1.jpg',
      ],
      price: 150,
      categoryName: 'Орхідеї',
      speciesName: 'Цимбідіум',
    },
    {
      name: 'Wild Green',
      images: [
        'https://florium.ua/media/catalog/product/cache/1/file/9df78eab33525d08d6e5fb8d27136e95/o/r/orhideja-wild-green.jpg',
        'https://florium.ua/media/catalog/product/cache/1/file/9df78eab33525d08d6e5fb8d27136e95/1/_/1_2_44_2_1_1_22.jpg',
      ],
      price: 599,
      categoryName: 'Орхідеї',
      speciesName: 'Цимбідіум',
    },
    {
      name: 'Венерин башмачок',
      images: [
        'https://florium.ua/media/catalog/product/cache/2/file/9df78eab33525d08d6e5fb8d27136e95/p/a/pafiopedilum.jpg',
      ],
      price: 150,
      categoryName: 'Орхідеї',
      speciesName: 'Пафіопедилум',
    },
    {
      name: 'Король Артур',
      images: [
        'https://florium.ua/media/catalog/product/cache/2/file/9df78eab33525d08d6e5fb8d27136e95/p/a/paphiopedilum_king_arthur-1.jpg',
      ],
      price: 150,
      categoryName: 'Орхідеї',
      speciesName: 'Пафіопедилум',
    },
    {
      name: 'Аскоцентрум',
      images: [
        'https://florium.ua/media/catalog/product/cache/2/file/9df78eab33525d08d6e5fb8d27136e95/v/a/vanda-ascocentrum.jpg',
      ],
      price: 150,
      categoryName: 'Орхідеї',
      speciesName: 'Ванда',
    },
    {
      name: 'Ринхостилис',
      images: [
        'https://florium.ua/media/catalog/product/cache/2/file/9df78eab33525d08d6e5fb8d27136e95/r/h/rhynchostylis.jpg',
      ],
      price: 150,
      categoryName: 'Орхідеї',
      speciesName: 'Ванда',
    },
  ];

  try {
    // Создание категорий
    const createdCategories = await Promise.all(
      categories.map(async (category) => {
        const existingCategory = await prisma.category.findFirst({
          where: { name: category.name },
        });

        if (existingCategory) {
          throw new Error(`Категория "${category.name}" уже существует`);
        }

        return prisma.category.create({
          data: category,
        });
      })
    );

    // Создание видов
    const createdSpecies = await Promise.all(
      species.map(async (specie) => {
        const category = createdCategories.find((cat) => cat.name === specie.categoryName);

        if (!category) {
          throw new Error(`Категория "${specie.categoryName}" не найдена`);
        }

        const existingSpecies = await prisma.species.findFirst({
          where: {
            name: specie.name,
            categoryId: category.id,
          },
        });

        if (existingSpecies) {
          throw new Error(
            `Вид "${specie.name}" уже существует в категории "${specie.categoryName}"`
          );
        }

        return prisma.species.create({
          data: {
            name: specie.name,
            image: specie.image,
            categoryId: category.id,
          },
        });
      })
    );

    // Создание продуктов
    await Promise.all(
      products.map(async (product) => {
        const category = createdCategories.find((cat) => cat.name === product.categoryName);

        if (!category) {
          throw new Error(`Категория "${product.categoryName}" не найдена`);
        }

        const specie = createdSpecies.find(
          (specie) => specie.name === product.speciesName && specie.categoryId === category.id
        );

        if (!specie) {
          throw new Error(
            `Вид "${product.speciesName}" не найден в категории "${product.categoryName}"`
          );
        }

        const existingProduct = await prisma.product.findFirst({
          where: { name: product.name },
        });

        if (existingProduct) {
          throw new Error(`Продукт "${product.name}" уже существует`);
        }

        return prisma.product.create({
          data: {
            name: product.name,
            images: product.images,
            price: product.price,
            categoryId: category.id,
            speciesId: specie.id,
          },
        });
      })
    );

    return NextResponse.json({ message: 'Categories created successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create categories' }, { status: 500 });
  }
}
