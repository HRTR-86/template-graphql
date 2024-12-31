import dayjs, { Dayjs } from 'dayjs';
import { ErrorList } from '@/scripts/Common/System';
import { parseErrors } from '@/scripts/Validation/Validation';

type TrnSampleChild = {
  id: number;
  name: string;
};

type TrnSampleParent = {
  id: number;
  name: string;
  statusId: number;
  datetime: Dayjs | null;
  childIdList: number[];
};

export type OutputSampleEditInitialProps = {
  trnSampleParent: TrnSampleParent;
  trnSampleChildList: TrnSampleChild[];
  errorList: ErrorList;
};

export const parseSampleEditInitialProps = (
  props: any,
): OutputSampleEditInitialProps => {
  return {
    trnSampleParent: {
      id: Number(props?.trn_sample_parent?.id ?? 0),
      name: String(props?.trn_sample_parent?.name ?? ''),
      statusId: Number(props?.trn_sample_parent?.status_id ?? 0),
      datetime: props?.trn_sample_parent?.datetime
        ? dayjs(props?.trn_sample_parent?.datetime)
        : null,
      childIdList:
        props?.trn_sample_parent?.trn_sample_child_list?.map(
          (trnSampleChild: any) => {
            return Number(trnSampleChild?.id ?? 0);
          },
        ) ?? [],
    },
    trnSampleChildList:
      props?.trn_sample_child_list?.map((trnSampleChild: any) => {
        return {
          id: Number(trnSampleChild?.id ?? 0),
          name: String(trnSampleChild?.name ?? ''),
        };
      }) ?? [],
    errorList: parseErrors(props?.errors ?? {}),
  };
};
