import { extendType, floatArg, nonNull, objectType, stringArg } from "nexus";
import { getTransitInfo } from "../../../services/external/DirectionsAPI";

export const TransitInfo = objectType({
  name: "TransitInfo",
  definition(t) {
    t.int("arrivalTime");
    t.int("departureTime");
    t.int("distance");
    t.int("duration");
    t.string("travelMode");
  },
});

export const TransitInfoQueries = extendType({
  type: "Query",
  definition: (t) => {
    t.list.field("transitInfo", {
      type: "TransitInfo",
      args: {
        waypointId: nonNull(stringArg()),
        originLat: nonNull(floatArg()),
        originLng: nonNull(floatArg()),
      },
      resolve: async (_, args, ctx) => {
        const waypoint = await ctx.prisma.favoriteWaypoint.findUnique({
          where: { id: args.waypointId },
        });

        return getTransitInfo(
          `${args.originLat},${args.originLng}`,
          `${waypoint.lat},${waypoint.lng}`,
          "transit"
        );
      },
    });
  },
});

export const TransitInfoMutations = extendType({
  type: "Mutation",
  definition: (t) => {},
});
