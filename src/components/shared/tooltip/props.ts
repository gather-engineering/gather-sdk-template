import { CSSProperties } from 'react';
import { Interpolation } from 'styled-components';

export interface TooltipProps {
  title: string;
  children: React.ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  styles?: Interpolation<CSSProperties>;
}
