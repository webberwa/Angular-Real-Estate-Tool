import { meanBy } from 'lodash'
import { conditionalExpression } from 'babel-types'

const withReviews = (provider, id) => async prisma => {
  const reviews = await prisma
    .provider({
      id
    })
    .reviews()

  provider.reviews = reviews

  const reviewCount = reviews.length
  const reviewAvg = meanBy(reviews, 'rating')

  // Add provider stats
  provider.provider_stats = {
    review_avg: reviewAvg || 0,
    review_count: reviewCount || 0
  }

  return provider
}

export const provider = {
  Query: {
    async providers(parent, args, ctx, info) {
      const providers = await ctx.prisma.providers(args, info)

      // console.log(providers)

      const providersWithReviews = await Promise.all(
        await providers.map(async provider => {
          const providerWithReview = await withReviews(provider, provider.id)(
            ctx.prisma
          )
          // console.log(providerWithReview)
          return providerWithReview
        })
      )

      console.log(providersWithReviews)

      return providersWithReviews
    },
    async provider(parent, args, ctx, info) {
      const provider = await ctx.prisma.provider({
        id: args.where.id
      })

      return withReviews(provider, args.where.id)(ctx.prisma)
    }
  },
  Mutation: {
    async addProvider(root, { data }, context) {
      const { user } = context
      // Assign user to it
      data.owner = {
        connect: {
          id: user.id
        }
      }
      console.log(data)
      return await context.prisma.createProvider({
        ...data
      })
    },
    async updateProvider(root, { data, where }, ctx) {
      console.log(data, where)
      return await ctx.prisma.updateProvider({
        where,
        data
      })
    },
    async deleteProvider(root, { where }, ctx, info) {
      console.log(where)
      // Delete all reviews on provider

      const reviews = await ctx.prisma
        .provider({
          id: where.id
        })
        .reviews()

      if (reviews.length) {
        await Promise.all(
          reviews.forEach(async review => {
            console.log(review)
            await ctx.prisma.deleteReview({
              id: review.id
            })
          })
        )
      }

      console.log('after promise')
      const provider = await ctx.prisma.deleteProvider({
        ...where
      })
      console.log(provider)
      return provider
    }
  }
}
