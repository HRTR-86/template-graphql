/**
 * ステータスのサンプル
 */
export const SampleStatus = {
  INVALID: 0,
  PREPARATION: 1,
  ONGOING: 2,
  COMPLETED: 3,
} as const;

export type TSampleStatus = (typeof SampleStatus)[keyof typeof SampleStatus];

/**
 * ステータスに対応する色を取得
 * @param statusId
 */
export const getColor = (statusId: number) => {
  switch (statusId) {
    case SampleStatus.PREPARATION:
      return 'info';
    case SampleStatus.ONGOING:
      return 'success';
    case SampleStatus.COMPLETED:
      return 'error';
    default:
      return 'default';
  }
};
