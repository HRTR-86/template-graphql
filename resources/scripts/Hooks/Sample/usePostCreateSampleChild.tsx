import { Errors } from '@inertiajs/core/types/types';
import { router } from '@inertiajs/react';
import { useCallback } from 'react';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

interface CreateSampleChildData {
  name: string;
}

export interface PostCreateSampleChildParameter {
  data: CreateSampleChildData;
  only: string[];
  handleSuccess: () => void;
  handleError: (errors: any) => void;
}

const usePostCreateSampleChild = (url: string) => {
  const loadingContext = useLoadingContext();

  const postCreateSampleChild = useCallback(
    ({
      data,
      only,
      handleSuccess,
      handleError,
    }: PostCreateSampleChildParameter): void => {
      router.post(
        url,
        {
          name: data.name,
        },
        {
          only: only,
          onStart: loadingContext.handleStart,
          onFinish: loadingContext.handleFinish,
          onSuccess: handleSuccess,
          onError: (errors: Errors) => handleError(errors),
        },
      );
    },
    [],
  );

  return { postCreateSampleChild };
};

export default usePostCreateSampleChild;
