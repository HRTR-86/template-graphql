import PageBase from '@/scripts/Pages/PageBase';
import { router } from '@inertiajs/react';

const NotFoundPage = () => {
  /**
   * 戻るボタンをクリックした際にホームに戻る
   */
  function handleClickBack(): void {
    router.visit('/home');
  }

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
