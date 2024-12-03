import { Errors, Page } from '@inertiajs/core/types/types';
import { ErrorList } from '@/scripts/Common/System';
import { router } from '@inertiajs/react';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';
import { useState } from 'react';

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

  const [errors, setErrors] = useState<ErrorList>([] as never);

  const postLogin = ({
    data,
    only,
    handleSuccess,
    handleError,
  }: PostLoginParameter): void => {
    router.post(
      '/login',
      {
        email: data.email,
        password: data.password,
      },
      {
        only: only,
        onStart: loadingContext.handleStart,
        onFinish: loadingContext.handleFinish,
        onSuccess: (page: Page) => handleSuccess(page),
        onError: (errors: Errors) => {
          if (Object.prototype.hasOwnProperty.call(errors, 'error')) {
            handleError(errors);
          } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setErrors(errors);
          }
        },
      },
    );
  };

  return { postLogin, errors };
};

export default usePostLogin;
