type TrnSampleChild = {
  id: number;
  name: string;
};

type TrnSampleParent = {
  id: number;
  name: string;
  statusId: number;
  datetime: string;
  trnSampleChildList: TrnSampleChild[];
};

type Flash = {
  message: string;
};

export type OutputSampleDetailProps = {
  trnSampleParent: TrnSampleParent;
  flash: Flash;
};

export const parseSampleDetailProps = (props: any): OutputSampleDetailProps => {
  return {
    trnSampleParent: {
      id: Number(props?.trn_sample_parent?.id ?? 0),
      name: String(props?.trn_sample_parent?.name ?? ''),
      statusId: Number(props?.trn_sample_parent?.status_id ?? 0),
      datetime: String(props?.trn_sample_parent?.datetime ?? ''),
      trnSampleChildList:
        props?.trn_sample_parent?.trn_sample_child_list.map(
          (trnSampleChild: any) => {
            return {
              id: Number(trnSampleChild?.id ?? 0),
              name: String(trnSampleChild?.name ?? ''),
            };
          },
        ) ?? [],
    },
    flash: {
      message: props?.flash?.message ?? '',
    },
  };
};
