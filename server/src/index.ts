require('dotenv').config()
import { prisma } from './prisma/generated/index'
const { importSchema } = require('graphql-import')
const { ApolloServer, gql } = require('apollo-server')

const resolvers = {
  Query: {
    investments(root, args, context) {
      return context.prisma.investments()
    }
  },
  Mutation: {
    addInvestment(root, args, context) {
      return context.prisma.createInvestment({
        address: args.address,
        price: args.price,
        lease: args.lease
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

async function main() {
  const newInvestment = await prisma.createInvestment({
    address: 'Address',
    price: 150000,
    lease: 1200
  })
}

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
  main().catch(e => console.error(e))
})
