import { Errors } from '@inertiajs/core/types/types';
import { router } from '@inertiajs/react';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

interface DeleteEventData {
  parentId: number;
}

export interface PostDeleteEventParameter {
  data: DeleteEventData;
  only: string[];
  handleSuccess: () => void;
  handleError: (errors: any) => void;
}

const usePostDeleteEvent = (url: string) => {
  const loadingContext = useLoadingContext();

  const postDeleteEvent = ({
    data,
    only,
    handleSuccess,
    handleError,
  }: PostDeleteEventParameter): void => {
    router.post(
      url,
      {
        parent_id: data.parentId,
      },
      {
        only: only,
        onStart: loadingContext.handleStart,
        onFinish: loadingContext.handleFinish,
        onSuccess: handleSuccess,
        onError: (errors: Errors) => handleError(errors),
      },
    );
  };

  return { postDeleteEvent };
};

export default usePostDeleteEvent;
