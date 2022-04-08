import { extendType, nonNull, nullable, objectType, stringArg } from "nexus";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.string("id");
    t.string("title");
    t.nullable.string("content");
    t.boolean("published");
    t.nullable.field("author", {
      type: "User",
      resolve: (parent, _, ctx) =>
        ctx.prisma.post
          .findUnique({
            where: { id: parent.id },
          })
          .author(),
    });
  },
});

export const PostQueries = extendType({
  type: "Query",
  definition: (t) => {
    t.field("post", {
      type: "Post",
      args: {
        postId: nonNull(stringArg()),
      },
      resolve: (_, args, ctx) => {
        return ctx.prisma.post.findUnique({
          where: { id: args.postId },
        });
      },
    });

    t.list.field("feed", {
      type: "Post",
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.post.findMany({
          where: { published: true },
        });
      },
    });

    t.list.field("drafts", {
      type: "Post",
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.post.findMany({
          where: { published: false },
        });
      },
    });

    t.list.field("filterPosts", {
      type: "Post",
      args: {
        searchString: nullable(stringArg()),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.prisma.post.findMany({
          where: {
            OR: [
              { title: { contains: searchString } },
              { content: { contains: searchString } },
            ],
          },
        });
      },
    });
  },
});

export const PostMutations = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nullable.field("deletePost", {
      type: "Post",
      args: {
        postId: stringArg(),
      },
      resolve: (_, { postId }, ctx) => {
        return ctx.prisma.post.delete({
          where: { id: postId },
        });
      },
    });

    t.field("createDraft", {
      type: "Post",
      args: {
        title: nonNull(stringArg()),
        content: stringArg(),
        authorEmail: stringArg(),
      },
      resolve: (_, { title, content, authorEmail }, ctx) => {
        return ctx.prisma.post.create({
          data: {
            title,
            content,
            published: false,
            author: {
              connect: { email: authorEmail },
            },
          },
        });
      },
    });

    t.nullable.field("publish", {
      type: "Post",
      args: {
        postId: stringArg(),
      },
      resolve: (_, { postId }, ctx) => {
        return ctx.prisma.post.update({
          where: { id: postId },
          data: { published: true },
        });
      },
    });
  },
});
