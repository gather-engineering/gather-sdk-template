import { CSSProperties } from 'react';
import { Interpolation } from 'styled-components';

export interface CardProps {
  styles?: Interpolation<CSSProperties>;
  children?: JSX.Element | JSX.Element[];
}
