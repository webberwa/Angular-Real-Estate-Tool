require('dotenv').config()
import { authenticateUser } from './resolvers/user'
import { resolvers } from './resolvers'
import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { prisma } from '../graphql/prisma/__generated__/index'
const { importSchema } = require('graphql-import')
const { ForbiddenError } = require('apollo-server')
const { PubSub } = require('apollo-server')
const { ApolloServer, gql } = require('apollo-server-express')

const typeDefs = importSchema('./graphql/schema.graphql')

enum Scope {
  Guest = 'GUEST',
  User = 'USER'
}

const context = async ({ req }) => {
  // console.log(req.get('Authorization'))

  let scope: Scope = Scope.Guest
  const user = await authenticateUser({ req, prisma })

  if (user) {
    scope = Scope.User
    // throw new ForbiddenError(
    //   'You need to be authenticated to access this schema!'
    // )
  }
  console.log('User scope: ' + scope)

  return { ...req, prisma, scope, user }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
})

const app = express()
app.use(cors())
server.applyMiddleware({ app, path: '/graphql' })

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: 4000 }, () => {
  console.log('Apollo Server on http://localhost:4000/graphql')
})
