import axios from 'axios';
import { useAuthUserContext } from '@/scripts/Provider/AuthUserProvider';
import { useEffect, useState } from 'react';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';
import {
  OutputAuthUserProps,
  parseAuthUserProps,
} from '@/scripts/Parser/Common/parseAuthUserProps';

interface AuthUserResponse {
  data: OutputAuthUserProps;
  fetch: () => Promise<void>;
}

const useFetchAuthUser = (isInitialFetch = false): AuthUserResponse => {
  const [data, setData] = useState<OutputAuthUserProps>(
    parseAuthUserProps(null),
  );

  const authUserContext = useAuthUserContext();
  const loadingContext = useLoadingContext();

  useEffect(() => {
    if (isInitialFetch) {
      fetch().then(() => {});
    }
  }, []);

  /**
   * データを取得する
   */
  const fetch = async (): Promise<void> => {
    loadingContext.handleStart();

    try {
      const response = await axios.get('/api/auth/user', {
        params: {},
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUserContext.authUser.accessToken}`,
        },
      });

      setData(parseAuthUserProps(response.data));
    } catch (error) {
      console.log(error);
    }

    loadingContext.handleFinish();
  };

  return {
    data,
    fetch,
  };
};

export default useFetchAuthUser;
