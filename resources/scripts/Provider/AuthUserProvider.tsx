import { AuthUser } from '@/scripts/Parser/Common/parseAuthUserProps';
import { createContext, useContext } from 'react';
import useFetchAuthUser from '@/scripts/Hooks/Auth/useFetchAuthUser';
import { TPermission } from '@/scripts/Enum/Mst/Permission';

interface AuthUserContext {
  authUser: AuthUser;
  permissionList: number[];
  hasPermission: (permission: TPermission) => boolean;
}

const AuthUserContext = createContext<AuthUserContext>({
  authUser: {
    id: 0,
    name: '',
    email: '',
    imageUrl: '',
    accessToken: '',
  },
  permissionList: [],
  hasPermission: () => false,
});

export const AuthUserProvider = (props: any) => {
  const { data } = useFetchAuthUser(true);

  const hasPermission = (permission: TPermission): boolean => {
    return data.permissionList.includes(permission as number);
  };

  return (
    <AuthUserContext.Provider
      value={{
        authUser: data.authUser,
        permissionList: data.permissionList,
        hasPermission,
      }}
    >
      {props.children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUserContext = () => useContext(AuthUserContext);
