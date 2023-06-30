import styled from 'styled-components';
import { rgba } from 'polished';
import { DialogProps } from './props';

export const DialogStyled = styled.div<DialogProps>`
  /**
  We put our default styles at top
  and if there is any custom styles it will be appended
  and override
   */
  background: #ffffff;
  box-shadow: 0px 20px 40px -4px ${rgba(0, 0, 0, 0.16)};
  border-radius: 16px;

  /**
  Keep this as the last one
   */
  ${({ styles }) => styles}
`;

export const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: ${({ open }) => (open ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
