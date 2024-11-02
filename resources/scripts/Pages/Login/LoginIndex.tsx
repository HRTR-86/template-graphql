import { IndexProvider } from '@/scripts/Provider/IndexProvider';
import LoginPage from '@/scripts/Pages/Login/LoginPage';

const LoginIndex = (props: any) => {
  return (
    <IndexProvider {...props}>
      <LoginPage {...props} />
    </IndexProvider>
  );
};

export default LoginIndex;
