const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

export const user = {
  Query: {},
  Mutation: {
    async createUser(root, args, ctx) {
      const password = await bcrypt.hash(args.password, 10)
      const user = await ctx.db.mutation.createUser({
        data: { ...args, password }
      })
      return {
        token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
        user
      }
    },
    async loginUser(root, { email, password }, ctx, info) {
      const user = await ctx.db.query.user({ where: { email } })
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
