import React from 'react';
import { BoxStyled } from './styled';
import { BoxComponent, BoxProps } from './props';

export const Box = ({ component = 'div', styles, children }: BoxProps) => {
  const Component: BoxComponent = component;

  return (
    <BoxStyled as={Component} styles={styles}>
      {children}
    </BoxStyled>
  );
};
