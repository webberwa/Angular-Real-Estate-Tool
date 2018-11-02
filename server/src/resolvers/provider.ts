import { meanBy } from 'lodash'
import { prisma } from '../../graphql/prisma/__generated__/index'
const algoliasearch = require('algoliasearch')
const client = algoliasearch('TQ3TDPJYHR', '0e672819466641d3e76c3aea82ec9395')
const index = client.initIndex('dev_WBIT')

// var contactsJSON = require('./contacts.json')

// index.addObjects(contactsJSON, function(err, content) {
//   if (err) {
//     console.error(err)
//   }
// })

const withReviews = async (provider, id, prisma) => {
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

      const providersWithReviews = await Promise.all(
        await providers.map(async provider => {
          const providerWithReview = await withReviews(
            provider,
            provider.id,
            ctx.prisma
          )
          // console.log(providerWithReview)
          return providerWithReview
        })
      )

      return providersWithReviews
    },
    async provider(parent, args, ctx, info) {
      const provider = await ctx.prisma.provider({
        id: args.where.id
      })

      return await withReviews(provider, args.where.id, ctx.prisma)
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

      const provider = await context.prisma.createProvider({
        ...data
      })

      console.log('provider', provider)

      // Add to algolia
      provider.objectID = provider.id
      console.log('before algolia')
      index.addObject(provider, function(err, content) {
        console.log('after algolia')
        console.log(content)
      })

      // const providers = await context.prisma.providers()
      // console.log(providers)
      // providers.forEach(provider => {
      //   provider.objectID = provider.id
      //   console.log('before algolia')
      //   index.addObject(provider, function(err, content) {
      //     console.log('after algolia')
      //     console.log(content)
      //   })
      // })

      return provider
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

      // Remove from algolia
      index.deleteObject(provider.id, function(err, content) {
        console.log(content)
      })

      console.log(provider)
      return provider
    }
  }
}
