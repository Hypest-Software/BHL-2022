import { extendType, nonNull, objectType, stringArg } from 'nexus'

export const BoughtTicket = objectType({
  name: 'BoughtTicket',
  definition: (t) => {
    t.string('id')
    t.int('ticketCount')
    t.string('ticketId')
    t.string('userId')
  },
})

export const BoughtTicketQueries = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('boughtTickets', {
      type: BoughtTicket,
      args: {
        userId: nonNull(stringArg()),
      },
      resolve: (_, { userId }, ctx) => {
        return ctx.prisma.boughtTicket.findMany({
          where: {
            userId: userId,
          },
        })
      },
    })
  },
})

export const BoughtTicketMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('buyTicket', {
      type: 'BoughtTicket',
      args: {
        userId: nonNull(stringArg()),
        ticketId: nonNull(stringArg()),
      },
      resolve: async (_, { userId, ticketId }, ctx) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: userId,
          },
        })

        const ticket = await ctx.prisma.ticket.findUnique({
          where: {
            id: ticketId,
          },
        })

        if (user.balance < ticket.price) {
          throw new Error('Not enough money')
        }

        const boughtTicket = await ctx.prisma.boughtTicket.findUnique({
          where: {
            userId: userId,
            ticketId: ticketId,
          },
        })

        await ctx.prisma.user.update({
          where: { id: userId },
          data: {
            balance:
              (
                await ctx.prisma.user.findUnique({
                  where: { id: userId },
                })
              ).balance - ticket.price,
          },
        })

        await ctx.prisma.transaction.create({
          data: {
            type: 'SINGLE_RIDE',
            user: { connect: { id: userId } },
            amount: ticket.price,
            createdAt: new Date(),
          },
        })

        return ctx.prisma.boughtTicket.update({
          where: {
            id: boughtTicket.id,
          },
          data: {
            ticketCount: boughtTicket.ticketCount + 1,
          },
        })
      },
    })
  },
})
