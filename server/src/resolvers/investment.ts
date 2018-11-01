export const investment = {
  Query: {
    investments(root, args, context) {
      return context.prisma.investments()
    }
  },
  Mutation: {
    async addInvestment(root, { data }, ctx) {
      return await ctx.prisma.createInvestment({
        ...data
      })
    },
    async deleteInvestment(root, { where }, context) {
      console.log(where)
      return await context.prisma.deleteInvestment({
        ...where
      })
    }
  }
}
