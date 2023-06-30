import { CardStyled } from './styled';
import { CardProps } from './props';

export const Card = ({ styles, children }: CardProps) => (
  <CardStyled styles={styles}>{children}</CardStyled>
);
