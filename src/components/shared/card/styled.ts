import styled from 'styled-components';
import { rgba } from 'polished';
import { CardProps } from './props';

export const CardStyled = styled.div<CardProps>`
  /**
  We put our default styles at top
  and if there is any custom styles it will be appended
  and override
   */

  background-color: #ffffff;
  color: #212b36;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 2px 0 ${rgba(145, 158, 171, 0.2)},
    0 12px 24px -4px ${rgba(145, 158, 171, 0.12)};
  border-radius: 16px;
  padding: 20px;

  min-width: 350px;
  min-height: 30px;

  /**
  Keep this as the last one
   */
  ${({ styles }) => styles}
`;
