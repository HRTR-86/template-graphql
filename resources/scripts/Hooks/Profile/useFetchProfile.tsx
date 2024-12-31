import axios from 'axios';
import {
  OutputProfileProps,
  parseProfileProps,
} from '@/scripts/Parser/Profile/parseProfileProps';
import { useAuthUserContext } from '@/scripts/Provider/AuthUserProvider';
import { useEffect, useState } from 'react';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

interface ProfileResponse {
  data: OutputProfileProps;
  fetch: () => Promise<void>;
}

const useFetchProfile = (isInitialFetch = false): ProfileResponse => {
  const [data, setData] = useState<OutputProfileProps>(parseProfileProps(null));

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
      const response = await axios.get('/api/profile', {
        params: {},
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUserContext.authUser.accessToken}`,
        },
      });

      setData(parseProfileProps(response.data));
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

export default useFetchProfile;
