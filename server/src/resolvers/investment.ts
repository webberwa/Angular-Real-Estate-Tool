export const investment = {
  Query: {
    investments(root, args, context) {
      return context.prisma.investments()
    },
    async getInvestment(roots, args, ctx) {
      console.log('investment')
      console.log(args)
      const { where } = args
      const investment = await ctx.prisma.investment({ ...where })

      // Expense
      const expenses = await ctx.prisma
        .investment({
          id: investment.id
        })
        .expenses()

      investment.expenses = expenses

      console.log(investment)
      return investment
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
