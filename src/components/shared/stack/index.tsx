import { StackStyled } from './styled';
import { StackProps } from './props';

export const Stack = ({ styles, children }: StackProps) => (
  <StackStyled styles={styles}>{children}</StackStyled>
);
