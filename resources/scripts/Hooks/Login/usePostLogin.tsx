import { Errors, Page } from '@inertiajs/core/types/types';
import { router } from '@inertiajs/react';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

interface PostLoginData {
  email: string;
  password: string;
}

export interface PostLoginParameter {
  data: PostLoginData;
  only: string[];
  handleSuccess: (page: Page) => void;
  handleError: (errors: Errors) => void;
}

const usePostLogin = () => {
  const loadingContext = useLoadingContext();

  function postLogin({
    data,
    only,
    handleSuccess,
    handleError,
  }: PostLoginParameter): void {
    router.reload({
      method: 'post',
      data: {
        email: data.email,
        password: data.password,
      },
      only: only,
      onStart: loadingContext.handleStart,
      onFinish: loadingContext.handleFinish,
      onSuccess: (page: Page) => handleSuccess(page),
      onError: (errors: Errors) => handleError(errors),
    });
  }

  return { postLogin };
};

export default usePostLogin;
