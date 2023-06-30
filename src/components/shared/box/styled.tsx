import styled from 'styled-components';
import { BoxProps } from './props';

export const BoxStyled = styled.div<BoxProps>`
  /**
  We put our default styles at top
  and if there is any custom styles it will be appended
  and override
   */
  display: flex;

  /**
  Keep this as the last one
   */
  ${({ styles }) => styles}
`;
