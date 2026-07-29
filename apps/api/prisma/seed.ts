import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const slug = "default";

  await prisma.wedding.deleteMany({ where: { slug } });

  await prisma.wedding.create({
    data: {
      slug,
      brideName: "Анна",
      groomName: "Иван",
      displayName: "Анна & Иван",
      weddingDate: new Date("2026-08-15"),
      dateDisplay: "15 августа 2026",
      venueCity: "Москва",
      venueName: "Усадьба «Пример»",
      venueAddress: "ул. Садовая, 1",
      invitationGreeting: "Дорогие друзья и близкие!",
      invitationMessage:
        "Мы с радостью приглашаем вас разделить с нами один из самых важных дней в нашей жизни. Будем счастливы видеть вас на нашей свадьбе!",
      programItems: {
        create: [
          {
            time: "15:00",
            title: "Сбор гостей",
            description: "Welcome-зона, лёгкие напитки",
            sortOrder: 0,
          },
          {
            time: "16:00",
            title: "Церемония",
            sortOrder: 1,
          },
          {
            time: "17:00",
            title: "Банкет",
            description: "Ужин, тосты и танцы",
            sortOrder: 2,
          },
          {
            time: "22:00",
            title: "Завершение вечера",
            sortOrder: 3,
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
