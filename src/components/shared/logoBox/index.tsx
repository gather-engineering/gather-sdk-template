import { LogoBoxStyled } from './styled';
import { LogoBoxProps } from './props';

export const LogoBox = ({ logo, size, styles, width, height }: LogoBoxProps) => (
  <LogoBoxStyled size={size} styles={styles}>
    {logo && (
      <img src={logo} alt="" width={size || width || 56} height={size || height || 56}></img>
    )}
  </LogoBoxStyled>
);
