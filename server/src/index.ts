require('dotenv').config()
import { prisma } from './prisma/generated/index'
const { importSchema } = require('graphql-import')
const { ApolloServer, gql } = require('apollo-server-express')
import express from 'express'

const resolvers = {
  Query: {
    investments(root, args, context) {
      return context.prisma.investments()
    }
  },
  Mutation: {
    addInvestment(root, args, context) {
      return context.prisma.createInvestment({
        data: {
          address: args.address,
          price: args.price
        }
      })
    }
  }
}

const typeDefs = importSchema('schema.graphql')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma
  }
})

const app = express()

app.get('/', function(req, res, next) {
  res.send('This is home')
})

server.applyMiddleware({ app }) // app is from an existing express app

app.listen({ port: 4000 }, () =>
  console.log(`🚀  Ready at http://localhost:4000${server.graphqlPath}`)
)
