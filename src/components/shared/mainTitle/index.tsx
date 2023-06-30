import { MainTitleStyled } from './styled';
import { MainTitleProps } from './props';

export const MainTitle = ({ title, styles }: MainTitleProps) => (
  <MainTitleStyled styles={styles} title={title}>
    {title}
  </MainTitleStyled>
);
