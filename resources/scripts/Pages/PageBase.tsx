import { Box } from '@mui/material';
import Display from '@/scripts/Components/Display/Display';
import EmptySection, { EmptyProps } from '@/scripts/Pages/EmptySection';
import ErrorModal from '@/scripts/Components/ErrorModal';
import Header from '@/scripts/Components/Header/Header';
import Loading from '@/scripts/Components/Feedback/Loading';
import { PropsBase } from '@/scripts/Common/System';
import { router } from '@inertiajs/react';
import Snackbar from '@/scripts/Components/Feedback/Snackbar';
import { useErrorContext } from '@/scripts/Provider/ErrorProvider';
import { useLoadingContext } from '@/scripts/Provider/LoadingProvider';
import { useMemo } from 'react';
import { useSnackbarContext } from '@/scripts/Provider/SnackbarProvider';

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
    router.visit('/home');
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
      <ErrorModal
        isOpen={errorContext.error.code !== ''}
        error={errorContext.error}
        handleClose={errorContext.handleInit}
      />
    </Loading>
  );
};

export default PageBase;
