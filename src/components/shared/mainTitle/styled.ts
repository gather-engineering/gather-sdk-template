import styled from 'styled-components';
import { MainTitleProps } from './props';

export const MainTitleStyled = styled.h6<MainTitleProps>`
  /**
  We put our default styles at top
  and if there is any custom styles it will be appended
  and override
   */

  margin: 0;
  font-weight: 600;
  line-height: 1.5;
  font-size: 1em;

  /**
  Keep this as the last one
   */
  ${({ styles }) => styles}
`;
