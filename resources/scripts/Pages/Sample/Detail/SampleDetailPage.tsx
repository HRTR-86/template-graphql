import BasicButton from '@/scripts/Components/Button/BasicButton';
import { Box, Typography } from '@mui/material';
import { ButtonType } from '@/scripts/Enum/ButtonType';
import PageBase from '@/scripts/Pages/PageBase';
import { parseSampleDetailProps } from '@/scripts/Parser/Sample/Detail/parseSampleDetailProps';
import { Permission } from '@/scripts/Enum/Mst/Permission';
import SampleParentCard from '@/scripts/Pages/Sample/Detail/SampleParentCard';
import { useAuthUserContext } from '@/scripts/Provider/AuthUserProvider';
import { useEffect } from 'react';
import useFetchSampleStatusList from '@/scripts/Hooks/Mst/useFetchSampleStatusList';
import { useNavigate } from 'react-router-dom';
import { useSnackbarContext } from '@/scripts/Provider/SnackbarProvider';

const SampleDetailPage = (props: any) => {
  const { trnSampleParent, flash } = parseSampleDetailProps(props);

  const authUserContext = useAuthUserContext();
  const snackbarContext = useSnackbarContext();
  const navigate = useNavigate();

  const mstSampleStatus = useFetchSampleStatusList();

  useEffect(() => {
    if (!flash.message || !!snackbarContext.snackbar.message) {
      return;
    }

    snackbarContext.handleChange({
      message: flash.message,
    });
  }, [flash.message]);

  /**
   * ホーム画面に戻る
   */
  const handleClickBack = (): void => {
    navigate(-1);
  };

  if (trnSampleParent.id === 0) {
    return (
      <PageBase
        sx={{ padding: '16px 30%' }}
        emptyProps={{
          message: 'サンプルデータがありません',
          label: 'ホーム画面に戻る',
          onClose: handleClickBack,
        }}
      />
    );
  }

  return (
    <PageBase
      sx={{ padding: '16px 30%' }}
      hasPermission={authUserContext.hasPermission(
        Permission.BROWSE_PARENT_SAMPLE_DATA,
      )}
    >
      <Box
        sx={{
          margin: '0 0 16px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant={'h1'}>詳細画面のサンプル</Typography>
        <BasicButton
          sx={{
            width: '120px',
          }}
          label={'戻る'}
          type={ButtonType.TERTIARY}
          onClick={handleClickBack}
        />
      </Box>
      <SampleParentCard
        trnSampleParent={trnSampleParent}
        mstSampleStatus={mstSampleStatus}
      />
    </PageBase>
  );
};

export default SampleDetailPage;
