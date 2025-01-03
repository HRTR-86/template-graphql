import AddIcon from '@mui/icons-material/Add';
import Display from '@/scripts/Components/Display/Display';
import FloatButton from '@/scripts/Components/Button/FloatButton';
import PageBase from '@/scripts/Pages/PageBase';
import { Permission } from '@/scripts/Enum/Mst/Permission';
import SampleParentCard from '@/scripts/Pages/Home/SampleParentCard';
import { Stack, Typography } from '@mui/material';
import { TrnSampleParent } from '@/scripts/Parser/Home/parseHomeProps';
import { useAuthUserContext } from '@/scripts/Provider/AuthUserProvider';
import { useEffect } from 'react';
import useFetchHome from '@/scripts/Hooks/Home/useFetchHome';
import useFetchSampleStatusList from '@/scripts/Hooks/Mst/useFetchSampleStatusList';
import { useSnackbarContext } from '@/scripts/Provider/SnackbarProvider';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { data } = useFetchHome(true);

  const authUserContext = useAuthUserContext();
  const snackbarContext = useSnackbarContext();
  const navigate = useNavigate();

  const mstSampleStatus = useFetchSampleStatusList();

  useEffect(() => {
    if (!data?.flash.message || !!snackbarContext.snackbar.message) {
      return;
    }

    snackbarContext.handleChange({
      message: data?.flash.message,
    });
  }, [data?.flash.message]);

  const handleCreate = () => {
    navigate('/sample/create');
  };

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
        {data.trnSampleParentList.map((trnSampleParent: TrnSampleParent) => (
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
          label={'親テーブルデータを作成'}
          onClick={handleCreate}
        />
      </Display>
    </PageBase>
  );
};

export default HomePage;
