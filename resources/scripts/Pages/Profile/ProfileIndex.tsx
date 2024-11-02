import { IndexProvider } from '@/scripts/Provider/IndexProvider';
import ProfilePage from '@/scripts/Pages/Profile/ProfilePage';

const HomeIndex = (props: any) => {
  return (
    <IndexProvider {...props}>
      <ProfilePage {...props} />
    </IndexProvider>
  );
};

export default HomeIndex;
