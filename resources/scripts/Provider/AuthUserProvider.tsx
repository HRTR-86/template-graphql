import { createContext, useContext } from 'react';
import { AuthUser } from '@/scripts/Parser/Common/parseAuthUserProps';
import { TPermission } from '@/scripts/Enum/Mst/Permission';
import { useQueryAuthUser } from '@/scripts/Hooks/Query/Auth/useQueryAuthUser';

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
  const { data } = useQueryAuthUser();

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
