import axios from 'axios';
import { Errors, Page } from '@inertiajs/core/types/types';
import { useAuthUserContext } from '@/scripts/Provider/AuthUserProvider';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

interface PostSampleChildCreateData {
  childList: {
    name: string;
  }[];
}

export interface PostSampleChildCreateParameter {
  data: PostSampleChildCreateData;
  handleSuccess: (page: Page) => void;
  handleError: (errors: Errors) => void;
}

const usePostSampleChildCreate = () => {
  const authUserContext = useAuthUserContext();
  const loadingContext = useLoadingContext();

  const postSampleChildCreate = async ({
    data,
    handleSuccess,
    handleError,
  }: PostSampleChildCreateParameter): Promise<void> => {
    loadingContext.handleStart();

    try {
      const response = await axios.post(
        '/api/sample/child/create',
        {
          child_list: data.childList,
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

  return { postSampleChildCreate };
};

export default usePostSampleChildCreate;
