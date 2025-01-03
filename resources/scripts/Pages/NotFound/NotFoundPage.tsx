import PageBase from '@/scripts/Pages/PageBase';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  /**
   * 戻るボタンをクリックした際にホームに戻る
   */
  const handleClickBack = (): void => {
    navigate('/home');
  };

  return (
    <PageBase
      sx={{ padding: '16px 30%' }}
      emptyProps={{
        message: 'ページが見つかりません',
        label: 'ホーム画面に戻る',
        onClose: handleClickBack,
      }}
    />
  );
};

export default NotFoundPage;
