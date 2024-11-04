import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Определим количество записей
  const authorsCount = 50; // Количество авторов
  const compositionsPerAuthor = 5; // Количество композиций на одного автора

  for (let i = 0; i < authorsCount; i++) {
    // Создаем автора с Faker
    const author = await prisma.author.create({
      data: {
        name: faker.person.fullName(),
        website: faker.internet.domainName(),
        compositions: {
          create: Array.from({ length: compositionsPerAuthor }).map(() => ({
            name: faker.music.songName(),
            genre: faker.music.genre(),
            duration: faker.number.int({ min: 60, max: 3600 }), // Длительность от 1 мин до 1 часа
          })),
        },
      },
    });

    console.log(`Created author: ${author.name} with ${compositionsPerAuthor} compositions`);
  }

  console.log('Mock data added successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
