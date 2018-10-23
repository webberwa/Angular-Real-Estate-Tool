export const provider = {
  Query: {
    providers(root, args, context) {
      console.log(args)
      return context.prisma.providers(args)
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
