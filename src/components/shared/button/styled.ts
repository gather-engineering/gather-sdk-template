import styled from 'styled-components';
import { rgba } from 'polished';
import { ButtonProps } from './props';

export const ButtonStyled = styled.button<ButtonProps>`
  /**
  We put our default styles at top
  and if there is any custom styles it will be appended
  and override
   */
  color: #212b36;
  cursor: pointer;
  box-shadow: none;
  border: none;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* variant */
  ${(props) =>
    props.variant === 'outlined' && {
      ...{ border: `1px solid ${rgba(145, 158, 171, 0.32)}` },
      backgroundColor: 'transparent',
    }}

  ${(props) =>
    props.variant === 'text' && {
      ...{ backgroundColor: 'transparent' },
    }}

  ${(props) =>
    props.variant === 'contained' && {
      ...{ backgroundColor: `${rgba(145, 158, 171, 0.08)}` },
    }}

  /* size */
  ${(props) =>
    props.size === 'large' && {
      ...{ height: '48px', padding: '8px 22px', fontSize: 15, minWidth: 140 },
    }}

  ${(props) =>
    props.size === 'medium' && {
      ...{ height: '40px', padding: '6px 16px', fontSize: 14, minWidth: 120 },
    }}

  ${(props) =>
    props.size === 'small' && {
      ...{ height: '30px', padding: '4px 10px', fontSize: 13, minWidth: 30 },
    }}

  /* error */
  ${(props) =>
    props.error && {
      ...{ color: '#B71D18' },
      backgroundColor: rgba('#FF5630', 0.16),
    }}

  /* hover */
  ${(props) => {
    let shadowAlphaColor;
    let shadowBackgroundColor;
    if (!props.error) {
      shadowAlphaColor = rgba('#919eab', 0.16);
      shadowBackgroundColor = rgba('#919eab', 0.24);
    } else {
      shadowAlphaColor = rgba('#B71D18', 0.16);
      shadowBackgroundColor = rgba('#FF5630', 0.32);
    }

    return `&:hover {
      box-shadow: 0 8px 16px 0 ${shadowAlphaColor};
      background-color: ${shadowBackgroundColor};
    }`;
  }}

  :disabled {
    cursor: default;
    pointer-events: none;
  }

  & > img {
    margin-right: 9px;
    animation-name: ckw;
    animation-duration: 0.5s;
    animation-iteration-count: ${(props) => (Boolean(props.isLoading) ? 'infinite' : 0)};
    animation-timing-function: linear;
  }

  & > svg {
    margin-right: 9px;
    font-size: 22px;
  }

  @keyframes ckw {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  & > p {
    margin: auto;
  }

  /**
  Keep this as the last one
   */
  ${({ styles }) => styles}
`;
