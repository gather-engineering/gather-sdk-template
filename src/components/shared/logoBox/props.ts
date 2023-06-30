import { CSSProperties } from 'react';
import { Interpolation } from 'styled-components';

export interface LogoBoxProps {
  logo?: any;
  size?: number;
  styles?: Interpolation<CSSProperties>;
  width?: number | string;
  height?: number | string;
}
