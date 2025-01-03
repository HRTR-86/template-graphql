import { Box } from '@mui/material';
import Display from '@/scripts/Components/Display/Display';
import EmptySection, { EmptyProps } from '@/scripts/Pages/EmptySection';
import ErrorModal from '@/scripts/Modals/ErrorModal';
import Header from '@/scripts/Components/Header/Header';
import Loading from '@/scripts/Components/Feedback/Loading';
import Modal from '@/scripts/Components/Modal';
import { PropsBase } from '@/scripts/Common/System';
import Snackbar from '@/scripts/Components/Feedback/Snackbar';
import { useErrorContext } from '@/scripts/Provider/ErrorProvider';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';
import { useMemo } from 'react';
import { useSnackbarContext } from '@/scripts/Provider/SnackbarProvider';
import { useNavigate } from 'react-router-dom';

interface Props extends PropsBase {
  isDisplayHeader?: boolean;
  hasPermission?: boolean;
  emptyProps?: EmptyProps;
}

const PageBase = ({
  sx,
  children,
  isDisplayHeader = true,
  hasPermission = true,
  emptyProps,
}: Props) => {
  const loadingContext = useLoadingContext();
  const snackbarContext = useSnackbarContext();
  const errorContext = useErrorContext();
  const navigate = useNavigate();

  const isEmpty = emptyProps !== undefined;

  /**
   * ヘッダーを取得する
   */
  const header = useMemo(() => {
    return isDisplayHeader ? <Header /> : null;
  }, [isDisplayHeader]);

  /**
   * コンテンツを表示しない場合のプロパティを取得する
   */
  const getEmptyProps = (): EmptyProps => {
    if (!hasPermission) {
      return {
        message: 'アクセス権がありません',
        label: 'ホーム画面に戻る',
        onClose: handleClickBack,
      };
    }

    return emptyProps as EmptyProps;
  };

  /**
   * ホーム画面に戻る
   */
  const handleClickBack = (): void => {
    navigate('/home');
  };

  return (
    <Loading isLoading={loadingContext.isLoading}>
      {header}
      <Display isDisplay={!hasPermission || isEmpty}>
        <EmptySection emptyProps={getEmptyProps()} />
      </Display>
      <Display isDisplay={hasPermission && !isEmpty}>
        <Box
          sx={{
            padding: '8px',
            ...sx,
          }}
          component={'article'}
        >
          {children}
        </Box>
      </Display>
      <Snackbar
        isOpen={snackbarContext.snackbar.message !== ''}
        snackbar={snackbarContext.snackbar}
        handleClose={snackbarContext.handleClose}
      />
      <Modal
        sx={{ width: '320px', textAlign: 'center' }}
        isOpen={errorContext.error.title !== ''}
        onClose={errorContext.handleInit}
      >
        <ErrorModal
          title={errorContext.error.title}
          message={errorContext.error.message}
          onClose={errorContext.handleInit}
        />
      </Modal>
    </Loading>
  );
};

export default PageBase;
