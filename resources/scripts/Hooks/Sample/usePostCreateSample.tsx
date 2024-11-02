import { Dayjs } from 'dayjs';
import { Errors, Page } from '@inertiajs/core/types/types';
import { router } from '@inertiajs/react';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

interface PostCreateSampleData {
  parentName: string;
  statusId: number;
  datetime: Dayjs | null;
  childIdList: number[];
}

export interface PostCreateSampleParameter {
  data: PostCreateSampleData;
  only: string[];
  handleSuccess: (page: Page) => void;
  handleError: (errors: Errors) => void;
}

const usePostCreateSample = () => {
  const loadingContext = useLoadingContext();

  function postCreateSample({
    data,
    only,
    handleSuccess,
    handleError,
  }: PostCreateSampleParameter): void {
    router.reload({
      method: 'post',
      data: {
        parent_name: data.parentName,
        status_id: data.statusId,
        datetime:
          data.datetime === null
            ? null
            : data.datetime.format('YYYY-MM-DD HH:mm:ss'),
        child_id_list: data.childIdList,
      },
      only: only,
      onStart: loadingContext.handleStart,
      onFinish: loadingContext.handleFinish,
      onSuccess: (page: Page) => handleSuccess(page),
      onError: (errors: Errors) => handleError(errors),
    });
  }

  return { postCreateSample };
};

export default usePostCreateSample;
