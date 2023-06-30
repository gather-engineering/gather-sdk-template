import styled from 'styled-components';
import { AlertProps } from './props';
import { rgba } from 'polished';

export const AlertStyled = styled.div<AlertProps>`
  /**
  We put our default styles at top
  and if there is any custom styles it will be appended
  and override
   */
  display: flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: 8px;

  /* severity */
  ${({ severity }) => {
    if (severity === 'error') {
      return `
        background-color: #FFE9D5;
        color: #7A0916;
      `;
    } else if (severity === 'warning') {
      return `
        background-color: #FFF5CC;
        color: #7A4100;
      `;
    } else if (severity === 'success') {
      return `
        background-color: #D8FBDE;
        color: #0A5554;
      `;
    } else {
      return `
        background-color: ${rgba(51, 102, 255, 0.12)};
        color: #091A7A;
      `;
    }
  }}

  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.01071em;
  font-weight: 400;

  /**
  Keep this as the last one
   */
  ${({ styles }) => styles}
`;

export const AlertIconStyled = styled.div<{ severity: AlertProps['severity'] }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 14px;
  min-width: 20px;
  min-height: 20px;

  /* severity */
  ${({ severity }) => {
    if (severity === 'error') {
      return `
        color: #FF5630;
      `;
    } else if (severity === 'warning') {
      return `
        color: #FFAB00;
      `;
    } else if (severity === 'success') {
      return `
        color: #36B37E;
      `;
    } else {
      return `
        color: #3366FF;
      `;
    }
  }}
`;
