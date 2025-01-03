import axios from 'axios';
import { Dayjs } from 'dayjs';
import { Errors, Page } from '@inertiajs/core/types/types';
import { useAuthUserContext } from '@/scripts/Provider/AuthUserProvider';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

interface PostSampleEditData {
  parentId: number;
  parentName: string;
  statusId: number;
  datetime: Dayjs | null;
  childIdList: number[];
}

export interface PostSampleEditParameter {
  data: PostSampleEditData;
  handleSuccess: (page: Page) => void;
  handleError: (errors: Errors) => void;
}

const usePostSampleEdit = () => {
  const authUserContext = useAuthUserContext();
  const loadingContext = useLoadingContext();

  const postSampleEdit = async ({
    data,
    handleSuccess,
    handleError,
  }: PostSampleEditParameter): Promise<void> => {
    loadingContext.handleStart();

    try {
      const response = await axios.post(
        '/api/sample/edit',
        {
          parent_id: data.parentId,
          parent_name: data.parentName,
          status_id: data.statusId,
          datetime:
            data.datetime === null
              ? null
              : data.datetime.format('YYYY-MM-DD HH:mm:ss'),
          child_id_list: data.childIdList,
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

  return { postSampleEdit };
};

export default usePostSampleEdit;
