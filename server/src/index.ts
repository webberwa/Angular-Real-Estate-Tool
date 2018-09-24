require('dotenv').config()
import { prisma } from './prisma/generated/index'
const { importSchema } = require('graphql-import')
const { ApolloServer, gql } = require('apollo-server')

const resolvers = {
  Query: {
    publishedPosts(root, args, context) {
      return context.prisma.posts({ where: { published: true } })
    },
    post(root, args, context) {
      return context.prisma.post({ id: args.postId })
    },
    investments(root, args, context) {
      return context.prisma.investments()
    },
    postsByUser(root, args, context) {
      return context.prisma
        .user({
          id: args.userId
        })
        .posts()
    }
  },
  Mutation: {
    createDraft(root, args, context) {
      return context.prisma.createPost({
        data: {
          title: args.title,
          author: {
            connect: { id: args.userId }
          }
        }
      })
    },
    addInvestment(root, args, context) {
      return context.prisma.createInvestment({
        data: {
          address: args.address,
          price: args.price
        }
      })
    },
    publish(root, args, context) {
      return context.prisma.updatePost({
        where: { id: args.postId },
        data: { published: true }
      })
    },
    createUser(root, args, context) {
      return context.prisma.createUser({ name: args.name })
    }
  },

  User: {
    posts(root, args, context) {
      return context.prisma
        .user({
          id: root.id
        })
        .posts()
    }
  },
  Post: {
    author(root, args, context) {
      return context.prisma
        .post({
          id: root.id
        })
        .author()
    }
  }
}

const typeDefs = importSchema('schema.graphql')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma
  }
})

// A `main` function so that we can use async/await
async function main() {
  // Create a new user with a new post
  // const newUser = await prisma.createUser({
  //   name: "Bob",
  //   posts: {
  //     create: {
  //       title: "The data layer for modern apps"
  //     }
  //   }
  // });
  // console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`);
  // Read all users from the database and print them to the console
  // const allUsers = await prisma.users();
  // console.log(allUsers);
  // const allPosts = await prisma.posts();
  // console.log(allPosts);
}

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
  main().catch(e => console.error(e))
})
