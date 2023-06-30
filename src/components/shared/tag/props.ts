import { CSSProperties } from 'react';
import { Interpolation } from 'styled-components';

export interface TagProps {
  tag: string;
  styles?: Interpolation<CSSProperties>;
}
