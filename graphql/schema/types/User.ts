import { extendType, nonNull, objectType, stringArg, floatArg } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('email')
    t.float('balance')
    t.list.field('rides', {
      type: 'Ride',
      resolve: (parent, _, ctx) =>
        ctx.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .rides(),
    })
  },
})

export const UserQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('user', {
      type: 'User',
      args: {
        userId: nonNull(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        return ctx.prisma.user.findUnique({
          where: { id: args.userId },
        })
      },
    })
  },
})

export const UserMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('signupUser', {
      type: 'User',
      args: {
        name: stringArg(),
        email: nonNull(stringArg()),
      },
      resolve: (_, { name, email }, ctx) => {
        return ctx.prisma.user.create({
          data: {
            name,
            email,
            balance: 0.0,
          },
        })
      },
    })
    t.field('updateBalance', {
      type: 'User',
      args: {
        id: nonNull(stringArg()),
        amount: nonNull(floatArg()),
      },
      resolve: async (_, { id, amount }, ctx) => {
        return ctx.prisma.user.update({
          where: { id: id },
          data: {
            balance:
              (
                await ctx.prisma.user.findUnique({
                  where: { id: id },
                })
              ).balance + amount,
          },
        })
      },
    })
  },
})
