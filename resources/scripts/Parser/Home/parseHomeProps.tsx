interface TrnSampleChild {
  id: number;
  name: string;
}

export interface TrnSampleParent {
  id: number;
  name: string;
  statusId: number;
  datetime: string;
  trnSampleChildList: TrnSampleChild[];
}

interface Flash {
  message: string;
}

export interface OutputHomeProps {
  trnSampleParentList: TrnSampleParent[];
  flash: Flash;
}

export const parseHomeProps = (props: any): OutputHomeProps => {
  return {
    trnSampleParentList:
      props?.trn_sample_parent_list?.map((trnSampleParent: any) => {
        return {
          id: Number(trnSampleParent.id ?? 0),
          name: String(trnSampleParent.name ?? ''),
          statusId: Number(trnSampleParent.status_id ?? 0),
          datetime: String(trnSampleParent.datetime ?? ''),
          trnSampleChildList:
            trnSampleParent.trn_sample_child_list?.map(
              (trnSampleChild: any) => {
                return {
                  id: Number(trnSampleChild.id ?? 0),
                  name: String(trnSampleChild.name ?? ''),
                };
              },
            ) ?? [],
        };
      }) ?? [],
    flash: {
      message: props?.flash?.message ?? '',
    },
  };
};
