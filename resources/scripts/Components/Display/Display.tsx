import { PropsBase } from '@/scripts/Common/System';

interface Props extends PropsBase {
  isDisplay?: boolean;
}

const Display = ({ children, isDisplay }: Props) => {
  if (!isDisplay) {
    return null;
  }

  return <>{children}</>;
};

export default Display;
