export type TError = {
  code: string;
  title: string;
  message: string;
};

type OutputErrorProps = {
  error: TError;
};

export const parseErrorProps = (props: any): OutputErrorProps => {
  return {
    error: {
      code: String(props?.error?.code ?? ''),
      title: String(props?.error?.title ?? ''),
      message: String(props?.error?.message ?? ''),
    },
  };
};
