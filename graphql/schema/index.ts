import { asNexusMethod, makeSchema } from "nexus";
import { DateTimeResolver } from "graphql-scalars";
import path from "path";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "../permissions";

import * as User from "./types/User";
import * as Post from "./types/Post";
import * as Ride from "./types/Ride";
import * as FavoriteWaypoint from "./types/FavoriteWaypoint";
import { TransitInfo } from "./types/TransitInfo";

export const GQLDate = asNexusMethod(DateTimeResolver, "date");

export const baseSchema = makeSchema({
  types: [User, Post, Ride, FavoriteWaypoint, TransitInfo, GQLDate],
  plugins: [],
  outputs: {
    typegen: path.join(process.cwd(), "generated/nexus-typegen.ts"),
    schema: path.join(process.cwd(), "generated/schema.graphql"),
  },
  contextType: {
    module: path.join(process.cwd(), "graphql/context.ts"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
});

export const schema = applyMiddleware(baseSchema, permissions);
