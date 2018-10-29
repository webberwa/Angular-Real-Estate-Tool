export const investment = {
  Query: {
    investments(root, args, context) {
      return context.prisma.investments()
    }
  },
  Mutation: {
    async addInvestment(root, { data }, context) {
      console.log(context.scope)
      return await context.prisma.createInvestment({
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
