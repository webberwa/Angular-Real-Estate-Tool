import { HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat } from 'apollo-link';

const uri = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here
const createApollo = (httpLink: HttpLink) => {
  const myHttpLink = httpLink.create({ uri });
  return {
    link: concat(authMiddleware, myHttpLink),
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
    // console.log(response);
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
