import styled from 'styled-components';
import { TypographyProps } from './props';

export const TypographyStyled = styled.div<TypographyProps>`
  /**
  We put our default styles at top
  and if there is any custom styles it will be appended
  and override
   */
  margin: 0;
  padding: 0;

  ${({ variant }) => {
    switch (variant) {
      case 'h1':
        return `
          font-size: 64px;
          font-weight: 800;
          line-height: 80px;
          letter-spacing: 0;
        `;
      case 'h2':
        return `
          font-size: 48px;
          font-weight: 800;
          line-height: 64px;
          letter-spacing: 0;
        `;
      case 'h3':
        return `
          font-size: 32px;
          font-weight: 700;
          line-height: 48px;
          letter-spacing: 0;
        `;
      case 'h4':
        return `
          font-size: 24px;
          font-weight: 700;
          line-height: 36px;
          letter-spacing: 0;
        `;
      case 'h5':
        return `
          font-size: 20px;
          font-weight: 700;
          line-height: 30px;
          letter-spacing: 0;
        `;
      case 'h6':
        return `
          font-size: 18px;
          font-weight: 700;
          line-height: 28px;
          letter-spacing: 0;
        `;
      case 'subtitle1':
        return `
          font-size: 16px;
          font-weight: 600;
          line-height: 24px;
          letter-spacing: 0;
        `;
      case 'subtitle2':
        return `
          font-size: 14px;
          font-weight: 600;
          line-height: 22px;
          letter-spacing: 0;
        `;
      case 'body2':
        return `
            font-size: 14px;
            font-weight: 400;
            line-height: 22px;
            letter-spacing: 0;
          `;
      case 'body1':
      default:
        return `
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          letter-spacing: 0;
        `;
    }
  }}

  /**
  Keep this as the last one
   */
  ${({ styles }) => styles}
`;
