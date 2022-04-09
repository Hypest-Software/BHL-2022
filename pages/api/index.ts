import { ApolloServer } from 'apollo-server-micro'
import { NextApiHandler } from 'next'
import cors from 'micro-cors'
import { createContext } from '../../graphql/context'
import { schema } from '../../graphql/schema'

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler: NextApiHandler = async (req, res) => {
  const apolloServer = new ApolloServer({
    schema,
    context: createContext,
  })

  await apolloServer.start()

  const apolloServerHandler = apolloServer.createHandler({
    path: '/api',
  })

  if (req.method === 'OPTIONS') {
    res.end()
    return
  }

  return apolloServerHandler(req, res)
}

export default cors()(handler)
