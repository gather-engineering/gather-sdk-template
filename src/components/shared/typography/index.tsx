import React from 'react';
import { TypographyStyled } from './styled';
import { TypographyProps } from './props';

export const Typography = ({ variant = 'body1', styles, children }: TypographyProps) => {
  const Component =
    variant === 'h1'
      ? 'h1'
      : variant === 'h2'
      ? 'h2'
      : variant === 'h3'
      ? 'h3'
      : variant === 'h4'
      ? 'h4'
      : variant === 'h5'
      ? 'h5'
      : variant === 'h6'
      ? 'h6'
      : variant === 'subtitle1'
      ? 'h6'
      : variant === 'subtitle2'
      ? 'h6'
      : variant === 'body1'
      ? 'p'
      : variant === 'body2'
      ? 'p'
      : 'p';

  return (
    <TypographyStyled variant={variant} as={Component} styles={styles}>
      {children}
    </TypographyStyled>
  );
};
