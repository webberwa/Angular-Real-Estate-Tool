import { provider } from './provider'

export const review = {
  Query: {
    async reviews(root, args, ctx) {
      console.log('reviews!')
      console.log(args)
      const reviews = await ctx.prisma.reviews(args)
      return reviews
    }
  },
  Mutation: {
    async addReview(roots, { data }, ctx) {
      console.log(data)
      return await ctx.prisma.createReview({ ...data })
    }
  }
}
