import { HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, concat } from 'apollo-link';
import { UserService } from './user/user.service';
import { onError } from 'apollo-link-error';

const createApollo = (httpLink: HttpLink) => {
  const linkCache = new InMemoryCache();

  const http = httpLink.create({
    uri: 'http://localhost:4000/graphql'
  });

  const userStub = {
    __typename: 'User',
    id: null,
    email: null,
    has_two_factor: false
  };

  const localState = withClientState({
    cache: linkCache,
    defaults: {
      user: userStub
    },
    resolvers: {
      Mutation: {
        setLocalUser: (_, { user }, { cache }) => {
          cache.writeData({
            data: {
              user
            }
          });
          return user;
        }
      }
    }
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log('onError');
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const link = ApolloLink.from([
    // errorLink,
    localState,
    concat(authMiddleware, http)
  ]);

  return {
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        // fetchPolicy: 'network-only',
        // fetchPolicy: 'cache-and-network',
        errorPolicy: 'all'
      },
      query: {
        // fetchPolicy: 'network-only',
        errorPolicy: 'all'
      },
      mutate: {
        errorPolicy: 'all'
      }
    }
  };
};

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token') || ''
    )
  });

  // Get response
  return forward(operation).map(response => {
    return response;
  });
});

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {
  constructor(private user: UserService) {}
}
