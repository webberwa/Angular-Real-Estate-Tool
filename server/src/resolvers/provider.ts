export const provider = {
  Query: {
    async providers(parent, args, ctx, info) {
      console.log(args)
      const providers = await ctx.prisma.providers(args, info)
      return providers
    },
    async provider(parent, args, ctx, info) {
      const provider = await ctx.prisma.provider({
        id: args.where.id
      })
      const reviews = await ctx.prisma
        .provider({
          id: args.where.id
        })
        .reviews()

      provider.reviews = reviews
      return provider
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
    }
  }
}
