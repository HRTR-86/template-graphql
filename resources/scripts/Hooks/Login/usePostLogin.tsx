import axios, { isAxiosError } from 'axios';
import { Errors, Page } from '@inertiajs/core/types/types';
import { ErrorList } from '@/scripts/Common/System';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';
import { useState } from 'react';
import { HttpStatusCode } from '@/scripts/Enum/HttpStatusCode';

interface PostLoginData {
  email: string;
  password: string;
}

export interface PostLoginParameter {
  data: PostLoginData;
  handleSuccess: (page: Page) => void;
  handleError: (errors: Errors) => void;
}

const usePostLogin = () => {
  const loadingContext = useLoadingContext();

  const [errors, setErrors] = useState<ErrorList>([] as never);

  const postLogin = async ({
    data,
    handleSuccess,
    handleError,
  }: PostLoginParameter): Promise<void> => {
    loadingContext.handleStart();

    try {
      const response = await axios.post(
        '/login',
        {
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

  return { postLogin, errors };
};

export default usePostLogin;
