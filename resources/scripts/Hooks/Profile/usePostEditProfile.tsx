import { Errors, Page } from '@inertiajs/core/types/types';
import { router } from '@inertiajs/react';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

interface PostEditProfileData {
  userName: string;
  roleId: number;
}

export interface PostEditProfileParameter {
  data: PostEditProfileData;
  only: string[];
  handleSuccess: (page: Page) => void;
  handleError: (errors: Errors) => void;
}

const usePostEditProfile = () => {
  const loadingContext = useLoadingContext();

  function postEditProfile({
    data,
    only,
    handleSuccess,
    handleError,
  }: PostEditProfileParameter): void {
    router.reload({
      method: 'post',
      data: {
        user_name: data.userName,
        role_id: data.roleId,
      },
      only: only,
      onStart: loadingContext.handleStart,
      onFinish: loadingContext.handleFinish,
      onSuccess: (page: Page) => handleSuccess(page),
      onError: (errors: Errors) => handleError(errors),
    });
  }

  return { postEditProfile };
};

export default usePostEditProfile;
