import { PropsBase } from '@/scripts/Common/System';
import { Slider as MuiSlider } from '@mui/material';

interface Props extends PropsBase {
  value: number;
  color?: 'main';
  step?: number;
  marks?: boolean;
  min?: number;
  max?: number;
  valueLabelDisplay?: 'on' | 'auto' | 'off';
  disabled?: boolean;
  handleChange: (newValues: any) => void;
}

const Slider = ({
  sx,
  value,
  color = 'main',
  step,
  marks,
  min,
  max,
  valueLabelDisplay = 'off',
  disabled = false,
  handleChange,
}: Props) => {
  return (
    <MuiSlider
      sx={{
        ...sx,
      }}
      value={value}
      color={color}
      step={step}
      marks={marks}
      min={min}
      max={max}
      valueLabelDisplay={valueLabelDisplay}
      disabled={disabled}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};

export default Slider;
