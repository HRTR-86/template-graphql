import { Box, Card, Chip, Stack, Typography } from '@mui/material';
import { Errors } from '@inertiajs/core/types/types';
import { format } from '@/scripts/Common/Datetime';
import { getColor } from '@/scripts/Enum/Mst/SampleStatus';
import KebabMenu from '@/scripts/Components/KebabMenu';
import { MstSampleStatusModel } from '@/scripts/Hooks/Mst/useFetchSampleStatusList';
import { parseErrorProps } from '@/scripts/Parser/Common/parseErrorProps';
import { Permission } from '@/scripts/Enum/Mst/Permission';
import { PropsBase } from '@/scripts/Common/System';
import { router } from '@inertiajs/react';
import { TrnSampleParent } from '@/scripts/Parser/Home/parseHomeProps';
import { useAuthUserContext } from '@/scripts/Provider/AuthUserProvider';
import { useErrorContext } from '@/scripts/Provider/ErrorProvider';
import { useMemo } from 'react';
import usePostDeleteEvent from '@/scripts/Hooks/Sample/usePostDeleteSample';

interface Props extends PropsBase {
  trnSampleParent: TrnSampleParent;
  mstSampleStatus: MstSampleStatusModel;
}

const SampleParentCard = ({ trnSampleParent, mstSampleStatus }: Props) => {
  const authUserContext = useAuthUserContext();
  const errorContext = useErrorContext();

  const { postDeleteEvent } = usePostDeleteEvent('/sample/detail/delete');

  /**
   * メニューの編集ボタンをクリック時に編集画面に遷移する
   */
  const handleClickEdit = (): void => {
    router.visit(`/sample/edit/${trnSampleParent.id}`);
  };

  /**
   * データ登録の失敗時に実行する処理
   * @param errors
   */
  const handleError = (errors: Errors): void => {
    const { error } = parseErrorProps(errors);
    errorContext.handleChange(error);
  };

  /**
   * メニューの編集ボタンをクリック時に削除を実行する
   */
  const handleClickDelete = (): void => {
    postDeleteEvent({
      data: { parentId: trnSampleParent.id },
      only: ['trn_sample_parent', 'flash'],
      handleSuccess: () => {},
      handleError: handleError,
    });
  };

  const menuList = useMemo(() => {
    return [
      {
        label: '編集',
        onClick: handleClickEdit,
        isDisplay: authUserContext.hasPermission(Permission.EDIT_SAMPLE_DATA),
      },
      {
        label: '削除',
        onClick: handleClickDelete,
        isAlert: true,
        isDisplay: authUserContext.hasPermission(Permission.DELETE_SAMPLE_DATA),
      },
    ];
  }, [authUserContext.permissionList]);

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
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      <Box
        sx={{
          width: 'calc(100% - 40px)',
          padding: '16px 16px',
          display: 'grid',
          gap: '4px',
        }}
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
      </Box>
      <Box sx={{ padding: '4px 4px 0 0' }}>
        <KebabMenu
          menuList={menuList
            .filter((menu) => menu.isDisplay)
            .map((menu) => {
              return {
                label: menu.label,
                onClick: menu.onClick,
                isAlert: menu.isAlert,
              };
            })}
        />
      </Box>
    </Card>
  );
};

export default SampleParentCard;
