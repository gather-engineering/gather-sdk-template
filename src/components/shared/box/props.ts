import { CSSProperties } from 'react';
import { Interpolation } from 'styled-components';

export interface BoxProps {
  component?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  styles?: Interpolation<CSSProperties>;
}

export type BoxComponent = keyof JSX.IntrinsicElements | React.ComponentType<any>;
