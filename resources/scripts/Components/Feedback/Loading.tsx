import { Backdrop, CircularProgress } from '@mui/material';
import { PropsBase } from '@/scripts/Common/System';
import { useMemo } from 'react';

interface Props extends PropsBase {
  isLoading: boolean;
}

const Loading = ({ children, isLoading }: Props) => {
  const loading = useMemo(() => {
    return (
      <Backdrop
        open={isLoading}
        sx={{ zIndex: 10000 }}
      >
        <CircularProgress color={'base'} />
      </Backdrop>
    );
  }, [isLoading]);

  return (
    <>
      {children}
      {loading}
    </>
  );
};

export default Loading;
