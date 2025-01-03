import { Card, Chip, Stack, Typography } from '@mui/material';
import { format } from '@/scripts/Common/Datetime';
import { getColor } from '@/scripts/Enum/Mst/SampleStatus';
import { MstSampleStatusModel } from '@/scripts/Hooks/Mst/useFetchSampleStatusList';
import { PropsBase } from '@/scripts/Common/System';
import { TrnSampleParent } from '@/scripts/Parser/Home/parseHomeProps';
import { useNavigate } from 'react-router-dom';

interface Props extends PropsBase {
  trnSampleParent: TrnSampleParent;
  mstSampleStatus: MstSampleStatusModel;
}

const SampleParentCard = ({ trnSampleParent, mstSampleStatus }: Props) => {
  const navigate = useNavigate();

  /**
   * カードをクリック時に親テーブルデータの詳細ページに遷移する
   */
  const handleClick = (): void => {
    navigate(`/sample/detail/${trnSampleParent.id}`);
  };

  const getStatusLabel = (statusId: number) => {
    const status = mstSampleStatus.findById(statusId);
    if (!status) {
      return (
        <Chip
          sx={{ width: '70px' }}
          label={'未設定'}
          size={'small'}
          variant={'outlined'}
        />
      );
    }

    return (
      <Chip
        sx={{ width: '70px' }}
        label={status.name}
        size={'small'}
        color={getColor(status.id)}
        variant={'outlined'}
      />
    );
  };

  return (
    <Card
      sx={{
        padding: '16px 16px',
        display: 'grid',
        gap: '4px',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <Stack
        direction={'row'}
        spacing={1}
        alignItems={'center'}
      >
        {getStatusLabel(trnSampleParent.statusId)}
        <Typography>{trnSampleParent.name}</Typography>
      </Stack>
      <Typography sx={{ mt: '8px' }}>
        日時：{format(trnSampleParent.datetime)}
      </Typography>
      <Typography>
        子テーブル：
        {trnSampleParent.trnSampleChildList
          .map((trnSampleChild) => trnSampleChild.name)
          .join(', ')}
      </Typography>
    </Card>
  );
};

export default SampleParentCard;
