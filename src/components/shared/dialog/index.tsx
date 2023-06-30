import { DialogStyled, Overlay } from './styled';
import { DialogProps } from './props';
import { useRef, useEffect } from 'react';

export const Dialog = ({ open, onClose, styles, children }: DialogProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (overlayRef.current === event.target) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [open, onClose]);

  return (
    <Overlay ref={overlayRef} open={open}>
      <DialogStyled open={open} onClose={onClose}>
        {children}
      </DialogStyled>
    </Overlay>
  );
};
