import styled from 'styled-components';
import { LogoBoxProps } from './props';

export const LogoBoxStyled = styled.div<LogoBoxProps>`
  /**
  We put our default styles at top
  and if there is any custom styles it will be appended
  and override
   */

  box-sizing: border-box;
  margin: 0;
  padding: 0;

  ${({ size = 56 }) => `
    width: ${size}px;
    height: ${size}px;
  `}
}
  /**
  Keep this as the last one
   */
  ${({ styles }) => styles}
`;
