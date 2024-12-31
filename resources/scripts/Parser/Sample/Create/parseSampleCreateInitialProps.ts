import { ErrorList } from '@/scripts/Common/System';
import { parseErrors } from '@/scripts/Validation/Validation';

type TrnSampleChild = {
  id: number;
  name: string;
};

export type OutputSampleCreateInitialProps = {
  trnSampleChildList: TrnSampleChild[];
  errorList: ErrorList;
};

export const parseSampleCreateInitialProps = (
  props: any,
): OutputSampleCreateInitialProps => {
  return {
    trnSampleChildList:
      props?.trn_sample_child_list.map((trnSampleChild: any) => {
        return {
          id: Number(trnSampleChild.id ?? 0),
          name: String(trnSampleChild.name ?? ''),
        };
      }) ?? [],
    errorList: parseErrors(props?.errors ?? {}),
  };
};
