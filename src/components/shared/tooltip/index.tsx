import { TooltipStyled } from './styled';
import { TooltipProps } from './props';

export default function Tooltip({ title, children, placement = 'top', styles }: TooltipProps) {
  return (
    <TooltipStyled placement={placement} styles={styles}>
      {children}
      <div className="tooltip-content">{title}</div>
    </TooltipStyled>
  );
}
