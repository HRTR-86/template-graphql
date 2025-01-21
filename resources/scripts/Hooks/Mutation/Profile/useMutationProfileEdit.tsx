import { useEffect } from 'react';
import { DocumentNode, gql, useMutation } from '@apollo/client';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

const PROFILE_EDIT = gql`
  mutation ProfileEdit($user_name: String, $role_id: Int) {
    profileEdit(user_name: $user_name, role_id: $role_id) {
      status
    }
  }
`;

interface MutationProfileEditVariables {
  user_name: string;
  role_id: number;
}

interface ProfileEditResponse {
  profileEdit: ({
    variables,
  }: {
    variables: MutationProfileEditVariables;
  }) => void;
}

export const useMutationProfileEdit = ({
  refetchQueries = [],
}: {
  refetchQueries?: DocumentNode[];
}): ProfileEditResponse => {
  const loadingContext = useLoadingContext();

  const [profileEdit, { loading }] = useMutation(PROFILE_EDIT, {
    refetchQueries: [...refetchQueries],
  });

  useEffect(() => {
    loadingContext.handleChange(loading);
  }, [loading]);

  return {
    profileEdit,
  };
};
