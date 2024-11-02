import AddIcon from '@mui/icons-material/Add';
import Display from '@/scripts/Components/Display/Display';
import FloatButton from '@/scripts/Components/Button/FloatButton';
import PageBase from '@/scripts/Pages/PageBase';
import { parseHomeProps } from '@/scripts/Parser/Home/parseHomeProps';
import { Permission } from '@/scripts/Enum/Mst/Permission';
import SampleParentCard from '@/scripts/Pages/Home/SampleParentCard';
import { Stack, Typography } from '@mui/material';
import { useAuthUserContext } from '@/scripts/Provider/AuthUserProvider';
import { useEffect } from 'react';
import useFetchSampleStatusList from '@/scripts/Hooks/Mst/useFetchSampleStatusList';
import { useSnackbarContext } from '@/scripts/Provider/SnackbarProvider';

const HomePage = (props: any) => {
  const { trnSampleParentList, flash } = parseHomeProps(props);

  const authUserContext = useAuthUserContext();
  const snackbarContext = useSnackbarContext();

  const mstSampleStatus = useFetchSampleStatusList();

  useEffect(() => {
    if (!flash.message || !!snackbarContext.snackbar.message) {
      return;
    }

    snackbarContext.handleChange({
      message: flash.message,
    });
  }, [flash.message]);

  return (
    <PageBase sx={{ padding: '16px 30%' }}>
      <Typography
        sx={{
          margin: '0 0 16px 0',
          lineHeight: '36px',
        }}
        variant={'h1'}
      >
        ホーム画面のサンプル
      </Typography>
      <Stack spacing={2}>
        {trnSampleParentList.map((trnSampleParent: any) => (
          <SampleParentCard
            key={trnSampleParent.id}
            trnSampleParent={trnSampleParent}
            mstSampleStatus={mstSampleStatus}
          />
        ))}
      </Stack>
      <Display
        isDisplay={authUserContext.hasPermission(
          Permission.REGISTER_SAMPLE_DATA,
        )}
      >
        <FloatButton
          startIcon={<AddIcon />}
          label="親テーブルデータを作成"
          href={'/sample/create'}
        />
      </Display>
    </PageBase>
  );
};

export default HomePage;
