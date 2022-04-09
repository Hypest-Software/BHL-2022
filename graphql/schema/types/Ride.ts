import {
  arg,
  enumType,
  extendType,
  floatArg,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { getPollution } from '../../../services/external/WaqiApi'
import { getTransitInfo } from '../../../services/external/GoogleMapsAPI'
import { calculatePoints } from '../../../services/external/PointsService'

const Conveyance = enumType({
  name: 'Conveyance',
  members: ['ELECTRIC_CAR', 'TRANSIT', 'BIKE'],
})

export const Ride = objectType({
  name: 'Ride',
  definition(t) {
    t.string('id')
    t.float('start_lat')
    t.float('start_lng')
    t.float('end_lat')
    t.float('end_lng')
    t.float('distance')
    // @ts-ignore
    t.date('start_time')
    // @ts-ignore
    t.date('end_time')
    t.string('conveyance')
    t.float('points')
    t.boolean('single_ride_ticket')

    t.float('air_co')
    t.float('air_no')
    t.float('air_no2')
    t.float('air_o3')
    t.float('air_so2')
    t.float('air_pm2_5')
    t.float('air_pm10')
    t.float('air_nh3')
  },
})

export const RideQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('ride', {
      type: 'Ride',
      args: {
        rideId: nonNull(stringArg()),
      },
      resolve: (_, args, ctx) => {
        return ctx.prisma.ride.findUnique({
          where: { id: args.rideId },
        })
      },
    })

    t.field('activeRide', {
      type: 'Ride',
      args: {
        userId: nonNull(stringArg()),
      },
      resolve: (_, args, ctx) => {
        return ctx.prisma.ride.findFirst({
          where: { id: args.userId },
          orderBy: { start_time: 'desc' },
        })
      },
    })

    t.list.field('rides', {
      type: 'Ride',
      args: {
        userId: nonNull(stringArg()),
      },
      resolve: (_, args, ctx) => {
        return ctx.prisma.ride.findMany({
          where: { userId: args.userId },
          orderBy: { start_time: 'asc' },
        })
      },
    })
  },
})

export const RideMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('startRide', {
      type: 'Ride',
      args: {
        userId: nonNull(stringArg()),
        start_lat: nonNull(floatArg()),
        start_lng: nonNull(floatArg()),
      },
      resolve: async (_, { userId, start_lat, start_lng }, ctx) => {
        const pollution = await getPollution()

        return ctx.prisma.ride.create({
          data: {
            userId,
            start_lat,
            start_lng,
            start_time: new Date(),
            carbonMonoxide: pollution.carbonMonoxide,
            nitrogenDioxide: pollution.nitrogenDioxide,
            ozone: pollution.ozone,
            sulfurDioxide: pollution.sulfurDioxide,
            particulateMatter25: pollution.particulateMatter25,
            particulateMatter10: pollution.particulateMatter10,
          },
        })
      },
    })

    t.field('endRide', {
      type: 'Ride',
      args: {
        rideId: nonNull(stringArg()),
        userId: nonNull(stringArg()),
        end_lat: nonNull(floatArg()),
        end_lng: nonNull(floatArg()),
        conveyance: nonNull(arg({ type: Conveyance })),
      },
      resolve: async (
        _,
        { rideId, userId, end_lat, end_lng, conveyance },
        ctx
      ) => {
        const ride = await ctx.prisma.ride.findUnique({
          where: { id: rideId },
        })

        const transitInfo = await getTransitInfo(
          `${ride.start_lat},${ride.start_lng}`,
          `${end_lat},${end_lng}`,
          'transit'
        )

        const points = calculatePoints(
          transitInfo.distance,
          ride.particulateMatter10
        )

        return ctx.prisma.ride.update({
          where: { id: rideId },
          data: {
            end_lat,
            end_lng,
            end_time: new Date(),
            conveyance,
            distance: transitInfo.distance,
            points,
          },
        })
      },
    })
  },
})
