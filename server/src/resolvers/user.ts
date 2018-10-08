const { PubSub } = require('apollo-server')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const pubsub = new PubSub()
const USER_STATE_CHANGED = 'USER_STATE_CHANGED'

export const authenticateUser = async ({ req, prisma }) => {
  const token = req.get('Authorization')

  console.log(token)

  if (!token) {
    return null
  }

  const userId = await jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decoded) => {
      const { userId } = decoded
      return userId
    }
  )
  const user = await prisma.user({
    id: userId
  })
  return user
}

export const user = {
  Query: {
    me(root, args, ctx) {
      const { user } = ctx
      return { id: user.id, email: user.email }
    },
    async user(root, args, ctx) {
      console.log(ctx.user)
      console.log('user')
    }
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
