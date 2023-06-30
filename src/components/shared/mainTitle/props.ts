import { CSSProperties } from 'react';
import { Interpolation } from 'styled-components';

export interface MainTitleProps {
  title: string;
  styles?: Interpolation<CSSProperties>;
}
