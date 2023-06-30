import styled from 'styled-components';
import { TagProps } from './props';

export const TagStyled = styled.span<TagProps>`
  /**
  We put our default styles at top
  and if there is any custom styles it will be appended
  and override
   */

  height: 24px;
  min-width: 22px;
  line-height: 0;
  border-radius: 6px;
  cursor: default;
  align-items: center;
  white-space: nowrap;
  display: inline-flex;
  justify-content: center;
  padding: 0px 8px;
  color: #212b36;
  background-color: rgba(145, 158, 171, 0.16);
  text-transform: none;
  font-size: 12px;
  font-weight: 500;
  box-sizing: border-box;

  /**
  Keep this as the last one
   */
  ${({ styles }) => styles}
`;
