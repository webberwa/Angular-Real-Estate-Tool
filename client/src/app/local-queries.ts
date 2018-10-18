import { User } from './apollo-angular-services';
import gql from 'graphql-tag';
export const GET_LOCAL_USER = gql`
  {
    user @client {
      id
      email
    }
  }
`;

export const SET_LOCAL_USER = gql`
  mutation setLocalUser($user: User) {
    setLocalUser(user: $user) @client
  }
`;
