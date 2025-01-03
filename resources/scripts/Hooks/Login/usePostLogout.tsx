import axios from 'axios';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';

const usePostLogout = () => {
  const loadingContext = useLoadingContext();

  const postLogout = async (
    handleError: (errors: any) => void,
  ): Promise<void> => {
    loadingContext.handleStart();

    try {
      const response = await axios.post(
        '/logout',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      console.log(error);
    }

    loadingContext.handleFinish();
  };

  return { postLogout };
};

export default usePostLogout;
