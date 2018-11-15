export const expense = {
  Query: {
    expenses(roots, args, ctx) {
      console.log('expenses')
    }
  },
  Mutation: {
    async addExpense(roots, { data }, ctx) {
      console.log('add expense')
      console.log(data)
      return await ctx.prisma.createExpense({ ...data })
    },
    async deleteExpense(roots, { where }, ctx) {
      return await ctx.prisma.deleteExpense({ ...where })
    }
  }
}
