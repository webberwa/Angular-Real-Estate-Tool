# Installation

- Install Node.js V8
- `npm install -g gulp @angular/cli prisma`
- `yarn && cd client && yarn && cd ../server && yarn`
- `yarn dev` at project root

# Steps to creating a model

1. Edit [Prisma Model](https://www.prisma.io/docs/data-model-and-migrations/data-model-knul/) @ `server/graphql/prisma/datamodel.prisma`

- Prisma uses a very similar syntax to GraphQL, with some additions like `@unique` decorators.
- Once you edit that file, the generator will update `server/graphql/prisma/__generated__`, which creates schema that we import into our app.
- Also Prisma will deploy the updated schema to [Prisma Cloud](https://app.prisma.io/webber-wang-dc19dd/services/prisma-us1/wbit/dev/databrowser/), which contains the dashboard where you can view the database.

2. Edit Query/Mutation

- Earlier we defined Prisma schema which defines the database & it helps generate some code for us to use. We'll use using some of those codes now
- Edit `server/graphql/schema.graphql` for the root `Query` & `Mutation` schema
- Edit `server/graphql/services/` for the actual query & mutation calls, those will be used to generated Angular components to be used

3. Edit resolvers

- We then add our resolvers in `./server/src/index.ts`, this what the frontend GraphQL requests will call. Within these resolvers, we use Prisma to access the database
