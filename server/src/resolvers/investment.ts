export const investment = {
  Query: {
    investments(root, args, context) {
      return context.prisma.investments()
    }
  },
  Mutation: {
    addInvestment(root, args, context) {
      return context.prisma.createInvestment({
        address: args.address,
        price: args.price,
        lease: args.lease
      })
    }
  }
}
