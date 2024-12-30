import axios from 'axios';
import {
  OutputHomeProps,
  parseHomeProps,
} from '@/scripts/Parser/Home/parseHomeProps';
import { useAuthUserContext } from '@/scripts/Provider/AuthUserProvider';
import { useEffect, useState } from 'react';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

interface HomeResponse {
  data: OutputHomeProps;
  fetch: () => Promise<void>;
}

const useFetchHome = (isInitialFetch = false): HomeResponse => {
  const [data, setData] = useState<OutputHomeProps>(parseHomeProps(null));

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
      const response = await axios.get('/api/home', {
        params: {},
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUserContext.authUser.accessToken}`,
        },
      });

      setData(parseHomeProps(response.data));
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

export default useFetchHome;
