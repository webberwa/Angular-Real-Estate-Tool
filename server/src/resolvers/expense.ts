export const expense = {
  Query: {
    expenses(roots, args, ctx) {
      console.log('expenses')
    },
    async expense(roots, args, ctx) {
      return await ctx.prisma.expense({
        id: args.where.id
      })
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
    },
    async updateExpense(roots, { data, where }, ctx) {
      return await ctx.prisma.updateExpense({ data, where })
    }
  }
}
