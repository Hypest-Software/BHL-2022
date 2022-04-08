import { extendType, floatArg, nonNull, objectType, stringArg } from "nexus";
import { getTransitInfo } from "../../../services/external/GoogleMapsAPI";

export const TransitInfo = objectType({
  name: "TransitInfo",
  definition(t) {
    t.date("arrivalTime");
    t.date("departureTime");
    t.int("distance");
    t.int("duration");
    t.string("travelMode");
  },
});

export const TransitInfoQueries = extendType({
  type: "Query",
  definition: (t) => {
    t.field("transitInfo", {
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
