import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MouseEvent, useState } from 'react';
import { PropsBase } from '@/scripts/Common/System';
import Display from '@/scripts/Components/Display/Display';

export interface TMenu {
  label: string;
  isAlert?: boolean;
  onClick: () => void;
}

interface Props extends PropsBase {
  menuList: TMenu[];
}

const KebabMenu = ({ sx, menuList }: Props) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleOpen(event: MouseEvent<HTMLButtonElement>): void {
    setAnchorEl(event.currentTarget);
  }

  return (
    <Display isDisplay={menuList.length > 0}>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        sx={{
          ...sx,
          '.MuiList-root': {
            padding: 0,
          },
        }}
        anchorEl={anchorEl}
        open={anchorEl !== null && menuList.length > 0}
        onClose={() => setAnchorEl(null)}
      >
        {menuList.map((menu) => (
          <MenuItem
            sx={{ padding: '8px 16px' }}
            key={menu.label}
            onClick={menu.onClick}
          >
            <Typography
              color={
                menu.isAlert
                  ? theme.palette.error.main
                  : theme.palette.object.main
              }
            >
              {menu.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Display>
  );
};

export default KebabMenu;
