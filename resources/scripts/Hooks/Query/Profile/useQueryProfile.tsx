import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';
import {
  OutputProfileProps,
  parseProfileProps,
} from '@/scripts/Parser/Profile/parseProfileProps';
import type { ApolloError } from '@apollo/client/errors';

const PROFILE = gql`
  query {
    profile {
      trn_user_role_list {
        role_id
        is_current
      }
    }
  }
`;

interface ProfileResponse {
  data: OutputProfileProps;
  loading: boolean;
  error?: ApolloError;
}

export const useQueryProfile = ({
  callback,
}: {
  callback?: {
    onSuccess?: (data: OutputProfileProps) => void;
  };
}): ProfileResponse => {
  const loadingContext = useLoadingContext();

  const { data, loading, error } = useQuery(PROFILE);

  useEffect(() => {
    loadingContext.handleChange(loading);
  }, [loading]);

  useEffect(() => {
    if (callback?.onSuccess) {
      callback.onSuccess(parseProfileProps(data?.profile));
    }
  }, [data]);

  return {
    data: parseProfileProps(data?.profile),
    loading,
    error,
  };
};
