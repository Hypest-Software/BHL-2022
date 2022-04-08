import { extendType, nonNull, objectType, stringArg } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("email");
    t.list.field("posts", {
      type: "Post",
      resolve: (parent, _, ctx) =>
        ctx.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .posts(),
    });
  },
});

export const UserMutations = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("signupUser", {
      type: "User",
      args: {
        name: stringArg(),
        email: nonNull(stringArg()),
      },
      resolve: (_, { name, email }, ctx) => {
        return ctx.prisma.user.create({
          data: {
            name,
            email,
          },
        });
      },
    });
  },
});
