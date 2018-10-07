import { resolvers } from './resolvers'
require('dotenv').config()
import { prisma } from '../graphql/prisma/__generated__/index'
const { importSchema } = require('graphql-import')
const { ApolloServer, gql } = require('apollo-server')

const typeDefs = importSchema('./graphql/schema.graphql')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma
  }
})

async function main() {
  // const newInvestment = await prisma.createInvestment({
  //   address: 'Address',
  //   price: 150000,
  //   lease: 1200
  // })
}

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
  main().catch(e => console.error(e))
})
