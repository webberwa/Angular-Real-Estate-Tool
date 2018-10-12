import { investment } from './resolvers/investment'
import { user } from './resolvers/user'
import { merge } from 'lodash'
import {provider} from "./resolvers/provider";

const resolver = {
  Query: {},
  Mutation: {}
}

export const resolvers = merge(resolver, investment, user, provider)
