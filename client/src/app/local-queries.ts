import { User } from './apollo-angular-services';
import gql from 'graphql-tag';
export const GET_LOCAL_USER = gql`
  {
    user @client {
      id
      email
      has_two_factor
      is_admin
    }
  }
`;

export const SET_LOCAL_USER = gql`
  mutation setLocalUser($user: User) {
    setLocalUser(user: $user) @client
  }
`;
