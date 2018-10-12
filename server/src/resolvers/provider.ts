export const provider = {
  Query: {
    providers(root, args, context) {
      return context.prisma.providers(args)
    }
  },

  Mutation: {
      async addProvider(root, { data }, context) {
          console.log(context.scope)
          return await context.prisma.createProvider({
              ...data
          })
      }
  }
}
