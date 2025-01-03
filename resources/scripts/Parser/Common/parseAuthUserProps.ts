export type AuthUser = {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  accessToken: string;
};

export type OutputAuthUserProps = {
  authUser: AuthUser;
  permissionList: number[];
};

export const parseAuthUserProps = (props: any): OutputAuthUserProps => {
  return {
    authUser: {
      id: Number(props?.auth_user?.id ?? 0),
      name: String(props?.auth_user?.name ?? ''),
      email: String(props?.auth_user?.email ?? ''),
      imageUrl: String(props?.auth_user?.image_url ?? ''),
      accessToken: String(props?.auth_user?.access_token ?? ''),
    },
    permissionList: props?.permission_list?.map((id: any) => Number(id)) ?? [],
  };
};
