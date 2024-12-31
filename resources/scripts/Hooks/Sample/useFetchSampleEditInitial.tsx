import axios from 'axios';
import {
  OutputSampleEditInitialProps,
  parseSampleEditInitialProps,
} from '@/scripts/Parser/Sample/Edit/parseSampleEditInitialProps';
import { useAuthUserContext } from '@/scripts/Provider/AuthUserProvider';
import { useEffect, useState } from 'react';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

interface Parameter {
  parentId: number;
}

interface SampleEditInitialResponse {
  data: OutputSampleEditInitialProps;
  fetch: () => Promise<void>;
}

const useFetchSampleEditInitial = (
  isInitialFetch = false,
  params: Parameter,
): SampleEditInitialResponse => {
  const [data, setData] = useState<OutputSampleEditInitialProps>(
    parseSampleEditInitialProps(null),
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
      const response = await axios.get(`/api/sample-edit/${params.parentId}`, {
        params: {},
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUserContext.authUser.accessToken}`,
        },
      });

      setData(parseSampleEditInitialProps(response.data));
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

export default useFetchSampleEditInitial;
