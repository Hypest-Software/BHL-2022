import { Conveyance, Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371 // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1) // deg2rad below
  var dLon = deg2rad(lon2 - lon1)
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c // Distance in km
  return d
}

const warsawLatMax = 52.274729
const warsawLatMin = 52.172733
const warsawLngMax = 21.092944
const warsawLngMin = 20.906415

const randomConveyance = (): Conveyance => {
  const options: Conveyance[] = ['ELECTRIC_CAR', 'TRANSIT', 'BIKE']
  return options[Math.floor(Math.random() * options.length)]
}

const randomRide = (userId: string): Prisma.RideUncheckedCreateInput => {
  const startLat = getRandomArbitrary(warsawLatMin, warsawLatMax)
  const startLng = getRandomArbitrary(warsawLngMin, warsawLngMax)
  const endLat = getRandomArbitrary(warsawLatMin, warsawLatMax)
  const endLng = getRandomArbitrary(warsawLngMin, warsawLngMax)
  const distance = getDistanceFromLatLonInKm(startLat, startLng, endLat, endLng)
  return {
    start_lat: startLat,
    start_lng: startLng,
    end_lat: endLat,
    end_lng: endLng,
    distance: distance,
    conveyance: randomConveyance(),
    points: Math.floor(distance * 10),
    air_co: getRandomArbitrary(200, 220),
    air_no: getRandomArbitrary(0, 0.2),
    start_time: randomDate(new Date(2022, 0, 1), new Date()),
    end_time: randomDate(new Date(2022, 0, 2), new Date()),
    air_no2: getRandomArbitrary(0.1, 0.8),
    air_o3: getRandomArbitrary(0, 70),
    air_so2: getRandomArbitrary(0, 0.6),
    air_pm2_5: getRandomArbitrary(0, 0.5),
    air_pm10: getRandomArbitrary(0.4, 1),
    air_nh3: getRandomArbitrary(0, 0.1),
    userId: userId,
  }
}

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    balance: 10.0,
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    rides: {
      create: [
        {
          start_lat: 52.229675,
          start_lng: 21.012229,
          end_lat: 52.2295,
          end_lng: 21.0123,
          distance: 0.1,
          start_time: new Date(2022, 0, 1),
          end_time: new Date(2022, 0, 2),
          conveyance: Conveyance.ELECTRIC_CAR,
          air_co: 201.94053649902344,
          air_no: 0.01877197064459324,
          air_no2: 0.7711350917816162,
          air_o3: 68.66455078125,
          air_so2: 0.6407499313354492,
          air_pm2_5: 0.5,
          air_pm10: 0.540438711643219,
          air_nh3: 0.12369127571582794,
          points: 30,
        },
      ],
    },
    balance: 10.0,
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    balance: 10.0,
  },
]

const tickets: Prisma.TicketCreateInput[] = [
  {
    name: '30-minutowy',
    price: 5.0,
    duration: 30,
  },
  {
    name: '60-minutowy',
    price: 9.0,
    duration: 60,
  },
  {
    name: '90-minutowy',
    price: 12.0,
    duration: 90,
  },
  {
    name: '24-godzinny',
    price: 20.0,
    duration: 24 * 60,
  },
  {
    name: 'Miesięczny (31 dni)',
    price: 110.0,
    duration: 31 * 24 * 60,
  },
]

export async function main() {
  try {
    console.log(`Start seeding ...`)
    // for (const u of userData) {
    //   const user = await prisma.user.create({
    //     data: u,
    //   });
    //   console.log(`Created user with id: ${user.id}`);
    // }

    // [
    //   "6250823f2fcd1a1aae0c2a1a",
    //   "62507aa7d4106d32d5da9e1f",
    //   "62507a030172e7cfa18ebfd2",
    // ].forEach(async (userId) => {
    //   for (let i = 0; i < 10; i++) {
    //     const ride = await prisma.ride.create({
    //       data: randomRide(userId),
    //     });
    //     console.log(`Created ride with id: ${ride.id}`);
    //   }
    // });

    for (const t of tickets) {
      const ticket = await prisma.ticket.create({
        data: t,
      })
      console.log(`Created ticket with id: ${ticket.id}`)
    }

    console.log(`Seeding finished.`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
