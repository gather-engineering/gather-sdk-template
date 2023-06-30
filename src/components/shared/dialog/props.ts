import { CSSProperties } from 'react';
import { Interpolation } from 'styled-components';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  styles?: Interpolation<CSSProperties>;
  children?: JSX.Element | JSX.Element[];
}
