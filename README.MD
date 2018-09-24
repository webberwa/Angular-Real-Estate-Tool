# Installation

1. `cd client && yarn && yarn start`
2. `cd server && yarn && yarn start`

# ORM Layer

We're using GraphQL & this BaaS Prisma which acts as our ORM / model layer. We define the `datamodel.prisma` & Prisma will auto generate our models for us. It will also create GraphQL mutations that we can use in our resolvers.

If you've worked with Mongoose, Prisma replaces that & auto - generates our models and methods for us. Prisma communicates to the database directly, so we indirectly interact with the database through Prisma.

## GraphQL Server

We update our `schema.graphql`, which is the mutations/queries that are front end will call.
We then add our resolvers in `./server/src/index.ts`, which dictate how we'll access the Prisma auto-generated methods.
