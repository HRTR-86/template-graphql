import { Errors } from '@inertiajs/core/types/types';
import { router } from '@inertiajs/react';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

const usePostLogout = () => {
  const loadingContext = useLoadingContext();

  const postLogout = (handleError: (errors: any) => void): void => {
    router.post(
      '/logout',
      {},
      {
        onStart: loadingContext.handleStart,
        onFinish: loadingContext.handleFinish,
        onError: (errors: Errors) => handleError(errors),
      },
    );
  };

  return { postLogout };
};

export default usePostLogout;
