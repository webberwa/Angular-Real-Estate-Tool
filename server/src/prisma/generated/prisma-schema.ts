export const typeDefs = /* GraphQL */ `type AggregateInvestment {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Investment {
  id: ID!
  address: String!
  price: Float
}

type InvestmentConnection {
  pageInfo: PageInfo!
  edges: [InvestmentEdge]!
  aggregate: AggregateInvestment!
}

input InvestmentCreateInput {
  address: String!
  price: Float
}

type InvestmentEdge {
  node: Investment!
  cursor: String!
}

enum InvestmentOrderByInput {
  id_ASC
  id_DESC
  address_ASC
  address_DESC
  price_ASC
  price_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type InvestmentPreviousValues {
  id: ID!
  address: String!
  price: Float
}

type InvestmentSubscriptionPayload {
  mutation: MutationType!
  node: Investment
  updatedFields: [String!]
  previousValues: InvestmentPreviousValues
}

input InvestmentSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: InvestmentWhereInput
  AND: [InvestmentSubscriptionWhereInput!]
  OR: [InvestmentSubscriptionWhereInput!]
  NOT: [InvestmentSubscriptionWhereInput!]
}

input InvestmentUpdateInput {
  address: String
  price: Float
}

input InvestmentWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  address: String
  address_not: String
  address_in: [String!]
  address_not_in: [String!]
  address_lt: String
  address_lte: String
  address_gt: String
  address_gte: String
  address_contains: String
  address_not_contains: String
  address_starts_with: String
  address_not_starts_with: String
  address_ends_with: String
  address_not_ends_with: String
  price: Float
  price_not: Float
  price_in: [Float!]
  price_not_in: [Float!]
  price_lt: Float
  price_lte: Float
  price_gt: Float
  price_gte: Float
  AND: [InvestmentWhereInput!]
  OR: [InvestmentWhereInput!]
  NOT: [InvestmentWhereInput!]
}

input InvestmentWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createInvestment(data: InvestmentCreateInput!): Investment!
  updateInvestment(data: InvestmentUpdateInput!, where: InvestmentWhereUniqueInput!): Investment
  updateManyInvestments(data: InvestmentUpdateInput!, where: InvestmentWhereInput): BatchPayload!
  upsertInvestment(where: InvestmentWhereUniqueInput!, create: InvestmentCreateInput!, update: InvestmentUpdateInput!): Investment!
  deleteInvestment(where: InvestmentWhereUniqueInput!): Investment
  deleteManyInvestments(where: InvestmentWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  investment(where: InvestmentWhereUniqueInput!): Investment
  investments(where: InvestmentWhereInput, orderBy: InvestmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Investment]!
  investmentsConnection(where: InvestmentWhereInput, orderBy: InvestmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): InvestmentConnection!
  node(id: ID!): Node
}

type Subscription {
  investment(where: InvestmentSubscriptionWhereInput): InvestmentSubscriptionPayload
}
`