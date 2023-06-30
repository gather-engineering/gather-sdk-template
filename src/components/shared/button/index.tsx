import { ButtonStyled } from './styled';
import { ButtonProps } from './props';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Button = ({
  label,
  styles,
  size,
  variant = 'contained',
  startIcon,
  startIconColor,
  isLoading,
  error,
  disabled,
  onClick,
  children,
}: ButtonProps) => (
  <ButtonStyled
    styles={styles}
    size={size}
    variant={variant}
    isLoading={isLoading}
    error={error}
    disabled={disabled}
    onClick={onClick}
  >
    {startIcon && <FontAwesomeIcon icon={startIcon} spin={isLoading} color={startIconColor} />}
    {label}
    {children}
  </ButtonStyled>
);
