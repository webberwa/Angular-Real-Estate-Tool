import { HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, concat } from 'apollo-link';
import { Apollo } from 'apollo-angular';
import { MeGQL } from './apollo-angular-services';
import { AuthenticationService } from './authentication/authentication.service';
import { SET_LOCAL_USER } from './local-queries';
import { delay } from 'rxjs/operators';

const createApollo = (httpLink: HttpLink) => {
  const linkCache = new InMemoryCache();

  const http = httpLink.create({
    uri: 'http://localhost:4000/graphql'
  });

  const localState = withClientState({
    cache: linkCache,
    defaults: {
      user: {
        __typename: 'User',
        id: null,
        email: null
      }
    },
    resolvers: {
      Mutation: {
        setLocalUser: (_, { user }, { cache }) => {
          console.log(user);
          cache.writeData({
            data: {
              user
            }
          });
          return user;
        },
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          const data = {
            networkStatus: {
              __typename: 'NetworkStatus',
              isConnected
            }
          };
          cache.writeData({ data });
          return null;
        },
        logout: (_, variables, { cache, getCacheKey }) => {
          console.log('logout');
          console.log(cache);
          cache.writeData({
            data: {
              user: {
                __typename: 'User',
                id: 1,
                email: ''
              }
            }
          });
          return null;
        }
      }
    }
  });

  const link = ApolloLink.from([localState, concat(authMiddleware, http)]);

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
  constructor(
    private apollo: Apollo,
    private meGQL: MeGQL,
    private authService: AuthenticationService
  ) {
    this.apollo
      .watchQuery({
        query: meGQL.document
      })
      .valueChanges.subscribe((res: any) => {
        const user = res.data.me;

        this.apollo
          .mutate({
            mutation: SET_LOCAL_USER,
            variables: {
              user
            }
          })
          .subscribe();

        // this.apollo.getClient().writeData({
        //   data: { user }
        // });
      });
  }
}
