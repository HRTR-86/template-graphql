import axios from 'axios';
import {
  OutputSampleCreateInitialProps,
  parseSampleCreateInitialProps,
} from '@/scripts/Parser/Sample/Create/parseSampleCreateInitialProps';
import { useAuthUserContext } from '@/scripts/Provider/AuthUserProvider';
import { useEffect, useState } from 'react';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

interface SampleCreateInitialResponse {
  data: OutputSampleCreateInitialProps;
  fetch: () => Promise<void>;
}

const useFetchSampleCreateInitial = (
  isInitialFetch = false,
): SampleCreateInitialResponse => {
  const [data, setData] = useState<OutputSampleCreateInitialProps>(
    parseSampleCreateInitialProps(null),
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
      const response = await axios.get(`/api/sample-create`, {
        params: {},
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUserContext.authUser.accessToken}`,
        },
      });

      setData(parseSampleCreateInitialProps(response.data));
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

export default useFetchSampleCreateInitial;
