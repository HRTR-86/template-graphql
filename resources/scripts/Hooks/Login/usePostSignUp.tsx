import axios, { isAxiosError } from 'axios';
import { Errors, Page } from '@inertiajs/core/types/types';
import { ErrorList } from '@/scripts/Common/System';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';
import { useState } from 'react';
import { HttpStatusCode } from '@/scripts/Enum/HttpStatusCode';

interface PostSignUpData {
  name: string;
  email: string;
  password: string;
}

export interface PostSignUpParameter {
  data: PostSignUpData;
  handleSuccess: (page: Page) => void;
  handleError: (errors: Errors) => void;
}

const usePostSignUp = () => {
  const loadingContext = useLoadingContext();

  const [errors, setErrors] = useState<ErrorList>([] as never);

  const postSignUp = async ({
    data,
    handleSuccess,
    handleError,
  }: PostSignUpParameter): Promise<void> => {
    loadingContext.handleStart();

    try {
      const response = await axios.post(
        '/sign-up',
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      handleSuccess(response.data);
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.status === HttpStatusCode.HTTP_UNPROCESSABLE_ENTITY) {
          setErrors(e?.response?.data.errors ?? []);
        } else {
          // TODO: その他のエラー処理を追加する
        }
      }
      console.log(e);
    }

    loadingContext.handleFinish();
  };

  return { postSignUp, errors };
};

export default usePostSignUp;
