import { CSSProperties } from 'react';
import { Interpolation } from 'styled-components';

export interface AlertProps {
  severity?: 'error' | 'warning' | 'info' | 'success';
  icon?: React.ReactNode;
  children: React.ReactNode;
  styles?: Interpolation<CSSProperties>;
}
