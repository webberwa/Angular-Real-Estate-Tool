export const investment = {
  Query: {
    async investments(root, args, ctx) {
      const investments = await ctx.prisma
        .user({
          id: ctx.user.id
        })
        .investments()
      console.log(investments)
      return investments
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
      console.log(data)
      return await ctx.prisma.createInvestment({
        ...data
      })
    },
    async updateInvestment(root, { data, where }, ctx) {
      console.log(data)
      return await ctx.prisma.updateInvestment({
        where,
        data
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
