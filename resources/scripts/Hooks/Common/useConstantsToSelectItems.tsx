import { SelectItem } from '@/scripts/Components/Form/SelectBox';
import { useMemo } from 'react';

interface ModelBase {
  id: number;
  name: string;
}

const useModelListToSelectItemList = (mstModelList: ModelBase[]) => {
  const selectItemList = useMemo(() => {
    return mstModelList.reduce((accumulator: SelectItem[], targetMstData) => {
      accumulator.push({
        label: targetMstData.name,
        value: targetMstData.id,
      });
      return accumulator;
    }, []);
  }, [mstModelList]);

  return {
    selectItemList,
  };
};

export default useModelListToSelectItemList;
