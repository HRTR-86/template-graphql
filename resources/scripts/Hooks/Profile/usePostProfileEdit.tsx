import axios from 'axios';
import { Errors, Page } from '@inertiajs/core/types/types';
import { useAuthUserContext } from '@/scripts/Provider/AuthUserProvider';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

interface PostEditProfileData {
  userName: string;
  roleId: number;
}

export interface PostEditProfileParameter {
  data: PostEditProfileData;
  handleSuccess: (page: Page) => void;
  handleError: (errors: Errors) => void;
}

const usePostEditProfile = () => {
  const authUserContext = useAuthUserContext();
  const loadingContext = useLoadingContext();

  const postEditProfile = async ({
    data,
    handleSuccess,
    handleError,
  }: PostEditProfileParameter): Promise<void> => {
    loadingContext.handleStart();

    try {
      const response = await axios.post(
        '/api/profile/edit',
        {
          user_name: data.userName,
          role_id: data.roleId,
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

  return { postEditProfile };
};

export default usePostEditProfile;
