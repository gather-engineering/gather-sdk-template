import styled, { css } from 'styled-components';
import { TooltipProps } from './props';

export const TooltipStyled = styled.div<{
  placement: TooltipProps['placement'];
  styles: TooltipProps['styles'];
}>`
  display: inline-block;
  position: relative;

  &:hover .tooltip-content {
    opacity: 1;
    pointer-events: auto;
  }

  ${({ placement }) => {
    switch (placement) {
      case 'right':
        return `
          .tooltip-content {
            left: 100%;
            top: 50%;
            transform: translate(0, -50%);
          }
        `;
      case 'bottom':
        return `
          .tooltip-content {
            top: 100%;
            left: 50%;
            transform: translate(-50%, 0);
          }
        `;
      case 'left':
        return `
          .tooltip-content {
            right: 100%;
            top: 50%;
            transform: translate(0, -50%);
          }
        `;
      default:
        return `
          .tooltip-content {
            bottom: 100%;
            left: 50%;
            transform: translate(-50%, 0);
          }
        `;
    }
  }}

  .tooltip-content {
    position: absolute;
    z-index: 1;
    padding: 0.5rem;
    background-color: #000;
    color: #fff;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.15s;
  }

  /**
  Keep this as the last one
   */
  ${({ styles }) => styles}
`;
