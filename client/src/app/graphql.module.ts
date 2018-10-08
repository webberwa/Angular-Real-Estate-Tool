import { HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';

const createApollo = (httpLink: HttpLink) => {
  const linkCache = new InMemoryCache();

  const http = httpLink.create({
    uri: 'http://localhost:4000/graphql'
  });

  // This doesn't work with setting headers
  // const http = createHttpLink({
  //   uri: 'http://localhost:4000/graphql',
  //   fetchOptions: {
  //     watchQuery: {
  //       fetchPolicy: 'network-only'
  //     }
  //   }
  // });

  const localState = withClientState({
    cache: linkCache,
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          const data = {
            networkStatus: {
              __typename: 'NetworkStatus',
              isConnected
            }
          };
          cache.writeData({ data });
          return null;
        }
      }
    }
  });

  const link = ApolloLink.from([localState, concat(authMiddleware, http)]);

  return {
    link,
    cache: new InMemoryCache()
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
export class GraphQLModule {}
