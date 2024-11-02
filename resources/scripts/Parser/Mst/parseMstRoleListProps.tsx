export interface MstRole {
  id: number;
  name: string;
}

export const parseMstRoleListProps = (props: any): MstRole[] => {
  return (
    props?.mst_role_list.map((item: any) => {
      return {
        id: item.id ?? 0,
        name: item.name ?? '',
      };
    }) ?? []
  );
};
