import {
  extendType,
  nonNull,
  objectType,
  stringArg,
  floatArg,
  enumType,
  arg,
} from "nexus";

const TransactionType = enumType({
  name: "TransactionType",
  members: ["TOP_UP", "SINGLE_RIDE", "PAY_AS_YOU_GO", "REFUND"],
});

export const Transaction = objectType({
  name: "Transaction",
  definition(t) {
    t.string("id");
    t.field("type", { type: TransactionType });
    t.field("user", {
      type: "User",
      resolve: (parent, _, ctx) => {
        return ctx.prisma.transaction
          .findUnique({
            where: { id: parent.id },
          })
          .user();
      },
    });
    t.float("amount");
    // @ts-ignore
    t.date("createdAt");
  },
});

export const TransactionQueries = extendType({
  type: "Query",
  definition(t) {
    t.field("transaction", {
      type: "Transaction",
      args: {
        transactionId: nonNull(stringArg()),
      },
      resolve: (_, { transactionId }, ctx) => {
        return ctx.prisma.transaction.findUnique({
          where: { id: transactionId },
        });
      },
    });
    t.list.field("transactions", {
      type: "Transaction",
      args: {
        userId: nonNull(stringArg()),
      },
      resolve: (_, { userId }, ctx) => {
        return ctx.prisma.transaction.findMany({
          where: { user: { id: userId } },
          orderBy: { createdAt: "desc" },
        });
      },
    });
  },
});

export const TransactionMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createTransaction", {
      type: "Transaction",
      args: {
        type: nonNull(arg({ type: TransactionType })),
        userId: nonNull(stringArg()),
        amount: nonNull(floatArg()),
      },
      resolve: (_, { type, userId, amount }, ctx) => {
        return ctx.prisma.transaction.create({
          data: {
            type,
            user: { connect: { id: userId } },
            amount,
            createdAt: new Date(),
          },
        });
      },
    });
  },
});
