/* tslint:disable */
import { GraphQLResolveInfo } from 'graphql'

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result

export type SubscriptionResolver<
  Result,
  Parent = any,
  Context = any,
  Args = any
> = {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result>
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>
}

export interface Query {
  investments: Investment[]
  user?: User | null
}

export interface Investment {
  id: string
  address: string
  price?: number | null
  lease?: number | null
}

export interface User {
  id: string
  email: string
  password: string
}

export interface Mutation {
  addInvestment?: Investment | null
  createUser?: AuthPayload | null
  loginUser?: AuthPayload | null
}

export interface AuthPayload {
  token: string
  user: User
}

export interface UserWhereUniqueInput {
  id?: string | null
  email?: string | null
}
export interface UserQueryArgs {
  where?: UserWhereUniqueInput | null
}
export interface AddInvestmentMutationArgs {
  address: string
  price?: number | null
  lease?: number | null
}
export interface CreateUserMutationArgs {
  email: string
  password: string
}
export interface LoginUserMutationArgs {
  email: string
  password: string
}

export namespace QueryResolvers {
  export interface Resolvers<Context = any> {
    investments?: InvestmentsResolver<Investment[], any, Context>
    user?: UserResolver<User | null, any, Context>
  }

  export type InvestmentsResolver<
    R = Investment[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>
  export type UserResolver<
    R = User | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UserArgs>
  export interface UserArgs {
    where?: UserWhereUniqueInput | null
  }
}

export namespace InvestmentResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>
    address?: AddressResolver<string, any, Context>
    price?: PriceResolver<number | null, any, Context>
    lease?: LeaseResolver<number | null, any, Context>
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >
  export type AddressResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>
  export type PriceResolver<
    R = number | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>
  export type LeaseResolver<
    R = number | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>
}

export namespace UserResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>
    email?: EmailResolver<string, any, Context>
    password?: PasswordResolver<string, any, Context>
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >
  export type EmailResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >
  export type PasswordResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>
}

export namespace MutationResolvers {
  export interface Resolvers<Context = any> {
    addInvestment?: AddInvestmentResolver<Investment | null, any, Context>
    createUser?: CreateUserResolver<AuthPayload | null, any, Context>
    loginUser?: LoginUserResolver<AuthPayload | null, any, Context>
  }

  export type AddInvestmentResolver<
    R = Investment | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, AddInvestmentArgs>
  export interface AddInvestmentArgs {
    address: string
    price?: number | null
    lease?: number | null
  }

  export type CreateUserResolver<
    R = AuthPayload | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, CreateUserArgs>
  export interface CreateUserArgs {
    email: string
    password: string
  }

  export type LoginUserResolver<
    R = AuthPayload | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, LoginUserArgs>
  export interface LoginUserArgs {
    email: string
    password: string
  }
}

export namespace AuthPayloadResolvers {
  export interface Resolvers<Context = any> {
    token?: TokenResolver<string, any, Context>
    user?: UserResolver<User, any, Context>
  }

  export type TokenResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >
  export type UserResolver<R = User, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >
}

export namespace Investments {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'
    investments: Investments[]
  }

  export type Investments = {
    __typename?: 'Investment'
    id: string
  }
}

export namespace User {
  export type Variables = {
    where: UserWhereUniqueInput
  }

  export type Query = {
    __typename?: 'Query'
    user?: User | null
  }

  export type User = {
    __typename?: 'User'
    id: string
    email: string
  }
}

export namespace CreateUser {
  export type Variables = {
    email: string
    password: string
  }

  export type Mutation = {
    __typename?: 'Mutation'
    createUser?: CreateUser | null
  }

  export type CreateUser = {
    __typename?: 'AuthPayload'
    token: string
    user: User
  }

  export type User = {
    __typename?: 'User'
    email: string
  }
}

export namespace LoginUser {
  export type Variables = {
    email: string
    password: string
  }

  export type Mutation = {
    __typename?: 'Mutation'
    loginUser?: LoginUser | null
  }

  export type LoginUser = {
    __typename?: 'AuthPayload'
    token: string
    user: User
  }

  export type User = {
    __typename?: 'User'
    email: string
  }
}

import { Injectable } from '@angular/core'

import * as Apollo from 'apollo-angular'

import gql from 'graphql-tag'

@Injectable({
  providedIn: 'root'
})
export class InvestmentsGQL extends Apollo.Query<
  Investments.Query,
  Investments.Variables
> {
  document: any = gql`
    query investments {
      investments {
        id
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class UserGQL extends Apollo.Query<User.Query, User.Variables> {
  document: any = gql`
    query user($where: UserWhereUniqueInput!) {
      user(where: $where) {
        id
        email
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class CreateUserGQL extends Apollo.Mutation<
  CreateUser.Mutation,
  CreateUser.Variables
> {
  document: any = gql`
    mutation createUser($email: String!, $password: String!) {
      createUser(email: $email, password: $password) {
        token
        user {
          email
        }
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class LoginUserGQL extends Apollo.Mutation<
  LoginUser.Mutation,
  LoginUser.Variables
> {
  document: any = gql`
    mutation loginUser($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        token
        user {
          email
        }
      }
    }
  `
}
