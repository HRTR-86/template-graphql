import axios from 'axios';
import {
  MstRole,
  parseMstRoleListProps,
} from '@/scripts/Parser/Mst/parseMstRoleListProps';
import { useEffect, useState } from 'react';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

interface Response {
  findById: (id: number) => MstRole | undefined;
  list: () => MstRole[];
}

const useFetchRoleList = (): Response => {
  const [mstRoleList, setMstRoleList] = useState<MstRole[]>([]);

  const loadingContext = useLoadingContext();

  useEffect(() => {
    fetch().then(() => {});
  }, []);

  /**
   * データを取得する
   */
  async function fetch(): Promise<void> {
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
  }

  /**
   * id指定でデータを取得する
   * @param id
   */
  function findById(id: number): MstRole | undefined {
    return mstRoleList.find((mstRole: MstRole) => mstRole.id === id);
  }

  /**
   * 一覧を取得する
   */
  function list(): MstRole[] {
    return mstRoleList;
  }

  return {
    findById,
    list,
  };
};

export default useFetchRoleList;
