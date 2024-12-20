import axios from 'axios';
import {
  MstRole,
  parseMstRoleListProps,
} from '@/scripts/Parser/Mst/parseMstRoleListProps';
import { useEffect, useState } from 'react';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

interface MstRoleModel {
  findById: (id: number) => MstRole | undefined;
  list: () => MstRole[];
}

const useFetchRoleList = (): MstRoleModel => {
  const [mstRoleList, setMstRoleList] = useState<MstRole[]>([]);

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
      const response = await axios.get('/api/role/list', {
        params: {},
        headers: { 'Content-Type': 'application/json' },
      });

      setMstRoleList(parseMstRoleListProps(response.data));
    } catch (error) {
      console.log(error);
    }

    loadingContext.handleFinish();
  };

  /**
   * id指定でデータを取得する
   * @param id
   */
  const findById = (id: number): MstRole | undefined => {
    return mstRoleList.find((mstRole: MstRole) => mstRole.id === id);
  };

  /**
   * 一覧を取得する
   */
  const list = (): MstRole[] => {
    return mstRoleList;
  };

  return {
    findById,
    list,
  };
};

export default useFetchRoleList;
