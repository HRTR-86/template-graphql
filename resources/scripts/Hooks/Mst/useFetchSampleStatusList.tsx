import axios from 'axios';
import {
  MstSampleStatus,
  parseMstSampleStatusListProps,
} from '@/scripts/Parser/Mst/parseMstSampleStatusListProps';
import { useEffect, useState } from 'react';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

export interface MstSampleStatusModel {
  findById: (id: number) => MstSampleStatus | undefined;
  list: () => MstSampleStatus[];
}

const useFetchSampleStatusList = (): MstSampleStatusModel => {
  const [MstSampleStatusList, setMstSampleStatusList] = useState<
    MstSampleStatus[]
  >([]);

  const loadingContext = useLoadingContext();

  useEffect(() => {
    fetch().then(() => {});
  }, []);

  /**
   * データを取得する
   */
  const fetch = async (): Promise<void> => {
    loadingContext.handleStart();

    try {
      const response = await axios.get('/api/sample-status/list', {
        params: {},
        headers: { 'Content-Type': 'application/json' },
      });

      setMstSampleStatusList(parseMstSampleStatusListProps(response.data));
    } catch (error) {
      console.log(error);
    }

    loadingContext.handleFinish();
  };

  /**
   * id指定でデータを取得する
   * @param id
   */
  const findById = (id: number): MstSampleStatus | undefined => {
    return MstSampleStatusList.find(
      (MstSampleStatus: MstSampleStatus) => MstSampleStatus.id === id,
    );
  };

  /**
   * 一覧を取得する
   */
  const list = (): MstSampleStatus[] => {
    return MstSampleStatusList;
  };

  return {
    findById,
    list,
  };
};

export default useFetchSampleStatusList;
