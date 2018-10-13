import gql from 'graphql-tag';
export const GET_LOCAL_USER = gql`
  {
    user @client {
      id
      email
    }
  }
`;
