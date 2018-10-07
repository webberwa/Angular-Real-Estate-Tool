import { investment } from './resolvers/investment'
import { user } from './resolvers/user'
import { merge } from 'lodash'

export const resolvers = merge(investment, user)
