import { ReactElement } from 'react';

export interface MainActionButtonProps {
  icon?: ReactElement;
  label?: string;
  onClick: () => void;
  color?: string;
  background?: string;
  borderRadius?: string;
}
