export interface MstSampleStatus {
  id: number;
  name: string;
}

export const parseMstSampleStatusListProps = (
  props: any,
): MstSampleStatus[] => {
  return (
    props?.mst_sample_status_list.map((item: any) => {
      return {
        id: item.id ?? 0,
        name: item.name ?? '',
      };
    }) ?? []
  );
};
