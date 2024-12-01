import { Errors, Page } from '@inertiajs/core/types/types';
import { router } from '@inertiajs/react';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

interface PostSignUpData {
  name: string;
  email: string;
  password: string;
}

export interface PostSignUpParameter {
  data: PostSignUpData;
  only: string[];
  handleSuccess: (page: Page) => void;
  handleError: (errors: Errors) => void;
}

const usePostSignUp = () => {
  const loadingContext = useLoadingContext();

  const postSignUp = ({
    data,
    only,
    handleSuccess,
    handleError,
  }: PostSignUpParameter): void => {
    router.post(
      '/sign-up',
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        only: only,
        onStart: loadingContext.handleStart,
        onFinish: loadingContext.handleFinish,
        onSuccess: (page: Page) => handleSuccess(page),
        onError: (errors: Errors) => handleError(errors),
      },
    );
  };

  return { postSignUp };
};

export default usePostSignUp;
