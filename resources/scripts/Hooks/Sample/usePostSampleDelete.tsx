import axios from 'axios';
import { Errors, Page } from '@inertiajs/core/types/types';
import { useAuthUserContext } from '@/scripts/Provider/AuthUserProvider';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

interface PostSampleDeleteData {
  parentId: number;
}

export interface PostSampleDeleteParameter {
  data: PostSampleDeleteData;
  handleSuccess: (page: Page) => void;
  handleError: (errors: Errors) => void;
}

const usePostSampleDelete = () => {
  const authUserContext = useAuthUserContext();
  const loadingContext = useLoadingContext();

  const postSampleDelete = async ({
    data,
    handleSuccess,
    handleError,
  }: PostSampleDeleteParameter): Promise<void> => {
    loadingContext.handleStart();

    try {
      const response = await axios.post(
        '/api/sample/delete',
        {
          parent_id: data.parentId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authUserContext.authUser.accessToken}`,
          },
        },
      );
      handleSuccess(response.data);
    } catch (error) {
      console.log(error);
    }

    loadingContext.handleFinish();
  };

  return { postSampleDelete };
};

export default usePostSampleDelete;
