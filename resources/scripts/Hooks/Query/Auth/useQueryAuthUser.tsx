import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';
import {
  OutputAuthUserProps,
  parseAuthUserProps,
} from '@/scripts/Parser/Common/parseAuthUserProps';
import type { ApolloError } from '@apollo/client/errors';

export const AUTH_USER = gql`
  query {
    authUser {
      auth_user {
        id
        name
        email
        image_url
      }
      permission_list
    }
  }
`;

interface AuthUserResponse {
  data: OutputAuthUserProps;
  loading: boolean;
  error?: ApolloError;
}

export const useQueryAuthUser = (): AuthUserResponse => {
  const loadingContext = useLoadingContext();

  const { data, loading, error } = useQuery(AUTH_USER);

  useEffect(() => {
    loadingContext.handleChange(loading);
  }, [loading]);

  return {
    data: parseAuthUserProps(data?.authUser),
    loading,
    error,
  };
};
