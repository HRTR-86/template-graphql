/**
 * 権限
 */
export const Permission = {
  INVALID: 0,
  BROWSE_ADMINISTRATION_PAGE: 1,
  BROWSE_DEVELOPER_PAGE: 2,
  BROWSE_PARENT_SAMPLE_DATA: 3,
  REGISTER_SAMPLE_DATA: 4,
  EDIT_SAMPLE_DATA: 5,
  DELETE_SAMPLE_DATA: 6,
} as const;

export type TPermission = (typeof Permission)[keyof typeof Permission];
