import {extendType, nonNull, objectType, stringArg} from "nexus";

export const Ride = objectType({
    name: "Ride",
    definition(t) {
        t.string("id");
        t.float("start_lat");
        t.float("start_lng");
        t.float("end_lat");
        t.float("end_lng");
        t.float("distance");
        // @ts-ignore
        t.date("start_time");
      // @ts-ignore
        t.date("end_time");
        t.string("conveyance");
        t.float("points");

        t.float("air_co");
        t.float("air_no");
        t.float("air_no2");
        t.float("air_o3");
        t.float("air_so2");
        t.float("air_pm2_5");
        t.float("air_pm10");
        t.float("air_nh3");
    },
});

export const RideQueries = extendType({
    type: "Query",
    definition: (t) => {
        t.field("ride", {
            type: "Ride",
            args: {
                rideId: nonNull(stringArg()),
            },
            resolve: (_, args, ctx) => {
                return ctx.prisma.ride.findUnique({
                    where: {id: args.rideId},
                });
            },
        });

        t.field("activeRide", {
            type: "Ride",
            args: {
                userId: nonNull(stringArg()),
            },
            resolve: (_, args, ctx) => {
                return ctx.prisma.ride.findFirst({
                    where: {id: args.userId},
                    orderBy: {start_time: "desc"},
                });
            },
        });

        t.list.field("rides", {
            type: "Ride",
            args: {
                userId: nonNull(stringArg()),
            },
            resolve: (_, args, ctx) => {
                return ctx.prisma.ride.findMany({
                    where: {userId: args.userId},
                    orderBy: {start_time: "asc"},
                });
            },
        });
    },
});
