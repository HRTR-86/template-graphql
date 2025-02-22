import axios from 'axios';
import {
  OutputSampleDetailProps,
  parseSampleDetailProps,
} from '@/scripts/Parser/Sample/Detail/parseSampleDetailProps';
import { useAuthUserContext } from '@/scripts/Provider/AuthUserProvider';
import { useEffect, useState } from 'react';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

interface Parameter {
  parentId: number;
}

interface SampleDetailResponse {
  data: OutputSampleDetailProps;
  fetch: () => Promise<void>;
}

const useFetchSampleDetail = (
  isInitialFetch = false,
  params: Parameter,
): SampleDetailResponse => {
  const [data, setData] = useState<OutputSampleDetailProps>(
    parseSampleDetailProps(null),
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
      const response = await axios.get(
        `/api/sample/detail/${params.parentId}`,
        {
          params: {},
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authUserContext.authUser.accessToken}`,
          },
        },
      );

      setData(parseSampleDetailProps(response.data));
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

export default useFetchSampleDetail;
