import { investment } from './resolvers/investment'
import { user } from './resolvers/user'
import { merge } from 'lodash'

const resolver = {
  Query: {},
  Mutation: {}
}

export const resolvers = merge(resolver, investment, user)
