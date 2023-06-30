import React from 'react';
import { AlertIconStyled, AlertStyled } from './styled';
import { AlertProps } from './props';

export const Alert = ({ severity = 'info', icon, children, styles }: AlertProps) => {
  return (
    <AlertStyled severity={severity} styles={styles}>
      {icon && <AlertIconStyled severity={severity}>{icon}</AlertIconStyled>}
      {children}
    </AlertStyled>
  );
};
