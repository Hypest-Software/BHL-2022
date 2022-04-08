import { Prisma, PrismaClient, Conveyance } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: [
        {
          title: "Join the Prisma Slack",
          content: "https://slack.prisma.io",
          published: true,
        },
      ],
    },
  },
  {
    name: "Nilu",
    email: "nilu@prisma.io",
    posts: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          content: "https://www.twitter.com/prisma",
          published: true,
        },
      ],
    },
    rides: {
      create: [
        {
          start_lat: 52.229675,
          start_lng: 21.012229,
          end_lat: 52.229500,
          end_lng: 21.012300,
          distance: 0.1,
          conveyance: Conveyance.ELECTRIC_CAR,
          air_co: 201.94053649902344,
          air_no: 0.01877197064459324,
          air_no2: 0.7711350917816162,
          air_o3: 68.66455078125,
          air_so2: 0.6407499313354492,
          air_pm2_5: 0.5,
          air_pm10: 0.540438711643219,
          air_nh3: 0.12369127571582794,
          points: 30
        }
      ]
    }
  },
  {
    name: "Mahmoud",
    email: "mahmoud@prisma.io",
    posts: {
      create: [
        {
          title: "Ask a question about Prisma on GitHub",
          content: "https://www.github.com/prisma/prisma/discussions",
          published: true,
        },
        {
          title: "Prisma on YouTube",
          content: "https://pris.ly/youtube",
        },
      ],
    },
  },
];

export async function main() {
  try {
    console.log(`Start seeding ...`);
    for (const u of userData) {
      const user = await prisma.user.create({
        data: u,
      });
      console.log(`Created user with id: ${user.id}`);
    }
    console.log(`Seeding finished.`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
