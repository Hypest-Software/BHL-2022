import { asNexusMethod, makeSchema } from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import path from 'path'

import * as User from './types/User'
import * as Ride from './types/Ride'
import * as Pollution from './types/Pollution'
import * as Ticket from './types/Ticket'
import * as Transaction from './types/Transaction'
import * as FavoriteWaypoint from './types/FavoriteWaypoint'
import * as TransitInfo from './types/TransitInfo'
import * as BoughtTicket from './types/BoughtTicket'

export const GQLDate = asNexusMethod(DateTimeResolver, 'date')

export const baseSchema = makeSchema({
  types: [
    User,
    Ride,
    Ticket,
    Transaction,
    FavoriteWaypoint,
    TransitInfo,
    Pollution,
    BoughtTicket,
    GQLDate,
  ],
  plugins: [],
  outputs: {
    typegen: path.join(process.cwd(), 'generated/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated/schema.graphql'),
  },
  contextType: {
    module: path.join(process.cwd(), 'graphql/context.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

export const schema = baseSchema

// export const schema = applyMiddleware(baseSchema, permissions)
