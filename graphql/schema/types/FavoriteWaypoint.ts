import { extendType, floatArg, nonNull, objectType, stringArg } from 'nexus'
import { geocoding, reverseGeocoding } from '../../../services/external/GoogleMapsAPI'

export const FavoriteWaypoint = objectType({
  name: 'FavoriteWaypoint',
  definition(t) {
    t.string('id')
    t.string('name')
    t.float('lat')
    t.float('lng')
    t.string('address')
    t.nullable.field('author', {
      type: 'User',
      resolve: (parent, _, ctx) =>
        ctx.prisma.favoriteWaypoint
          .findUnique({
            where: { id: parent.id },
          })
          .user(),
    })
  },
})

export const FavoriteWaypointQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('favoriteWaypoints', {
      type: 'FavoriteWaypoint',
      args: {
        userId: nonNull(stringArg()),
      },
      resolve: (_, args, ctx) => {
        return ctx.prisma.favoriteWaypoint.findMany({
          where: { userId: args.userId },
        })
      },
    })
  },
})

export const FavoriteWaypointMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.nullable.field('deleteWaypoint', {
      type: 'FavoriteWaypoint',
      args: {
        waypointId: stringArg(),
      },
      resolve: (_, { waypointId }, ctx) => {
        return ctx.prisma.favoriteWaypoint.delete({
          where: { id: waypointId },
        })
      },
    })

    t.field('createWaypoint', {
      type: 'FavoriteWaypoint',
      args: {
        name: nonNull(stringArg()),
        address: nonNull(stringArg()),
        userId: nonNull(stringArg()),
      },
      resolve: async (_, { name, address, userId }, ctx) => {
        const coords: number[] = await geocoding(address);
        return ctx.prisma.favoriteWaypoint.create({
          data: {
            name,
            lat: coords[0],
            lng: coords[1],
            address,
            userId,
          },
        })
      },
    })
  },
})
