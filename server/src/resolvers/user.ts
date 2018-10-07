import { createLexer } from 'graphql/language'

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

export const user = {
  Query: {
    // async user({ email }, args, ctx, info) {
    //   console.log('user')
    //   console.log(user)
    //   return ctx.prisma.user({ where: { email } }, info)
    // }
  },
  Mutation: {
    async createUser(root, args, ctx) {
      const password = await bcrypt.hash(args.password, 10)
      const user = await ctx.prisma.createUser({
        email: args.email,
        password
      })
      return {
        token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
        user
      }
    },
    async loginUser(root, { email, password }, ctx, info) {
      const user = await ctx.prisma.user({
        email
      })
      if (!user) {
        throw new Error(`No such user found for email: ${email}`)
      }

      const valid = await bcrypt.compare(password, user.password)
      if (!valid) {
        throw new Error('Invalid password')
      }

      return {
        token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
        user
      }
    }
  }
}
