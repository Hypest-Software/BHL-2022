import { extendType, nonNull, objectType, stringArg } from "nexus";

export const Ticket = objectType({
  name: "Ticket",
  definition: (t) => {
    t.string("id");
    t.string("name");
    t.float("price");
    t.int("duration");
  },
});

export const TicketQueries = extendType({
  type: "Query",
  definition(t) {
    t.field("ticket", {
      type: Ticket,
      args: {
        ticketId: nonNull(stringArg()),
      },
      resolve: (_, { ticketId }, ctx) => {
        return ctx.prisma.ticket.findUnique({
          where: {
            id: ticketId,
          },
        });
      },
    });
    t.list.field("tickets", {
      type: Ticket,
      resolve: (_, args, ctx) => {
        return ctx.prisma.ticket.findMany();
      },
    });
  },
});