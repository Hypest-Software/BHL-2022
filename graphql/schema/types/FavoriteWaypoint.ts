import {extendType, floatArg, nonNull, objectType, stringArg} from "nexus";
import {reverseGeocoding} from "../../../services/external/GoogleMapsAPI";

export const FavoriteWaypoint = objectType({
    name: "FavoriteWaypoint",
    definition(t) {
        t.string("id");
        t.string("name");
        t.float("lat");
        t.float("lng");
        t.nullable.field("author", {
            type: "User",
            resolve: (parent, _, ctx) =>
                ctx.prisma.post
                    .findUnique({
                        where: {id: parent.id},
                    })
                    .author(),
        });
    },
});

export const FavoriteWaypointQueries = extendType({
    type: "Query",
    definition: (t) => {
        t.list.field("favoriteWaypoints", {
            type: "FavoriteWaypoint",
            args: {
                authorId: nonNull(stringArg()),
            },
            resolve: (_, args, ctx) => {
                return ctx.prisma.favoriteWaypoint.findMany({
                    where: {authorId: args.authorId},
                });
            },
        });
    },
});

export const FavoriteWaypointMutations = extendType({
    type: "Mutation",
    definition: (t) => {
        t.nullable.field("deleteWaypoint", {
            type: "FavoriteWaypoint",
            args: {
                waypointId: stringArg(),
            },
            resolve: (_, {waypointId}, ctx) => {
                return ctx.prisma.favoriteWaypoint.delete({
                    where: {id: waypointId},
                });
            },
        });

        t.field("createWaypoint", {
            type: "FavoriteWaypoint",
            args: {
                name: nonNull(stringArg()),
                lat: nonNull(floatArg()),
                lng: nonNull(floatArg()),
                authorId: nonNull(stringArg()),
            },
            resolve: async (_, {name, lat, lng, authorId}, ctx) => {
              const address = await reverseGeocoding(Number(lat), Number(lng))

              return ctx.prisma.favoriteWaypoint.create({
                data: {
                  name,
                  lat: Number(lat),
                  lng: Number(lng),
                  address,
                  authorId,
                },
              });
            },
        });
    },
});
