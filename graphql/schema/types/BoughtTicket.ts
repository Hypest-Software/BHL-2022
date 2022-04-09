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
    t.field('ticket', {
      type: BoughtTicket,
      args: {
        ticketId: nonNull(stringArg()),
      },
      resolve: (_, { ticketId }, ctx) => {
        return ctx.prisma.ticket.findUnique({
          where: {
            id: ticketId,
          },
        })
      },
    })
  },
})
