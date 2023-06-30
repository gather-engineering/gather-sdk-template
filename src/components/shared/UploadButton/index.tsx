import { useRef } from 'react';
import { Button } from '../button';
import { ButtonProps } from '../button/props';

export function UploadButton({ onUpload, ...props }: ButtonProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };
  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <Button {...props} onClick={handleButtonClick} />
      <input type="file" accept=".zip" hidden ref={inputRef} onChange={handleFileUpload} />
    </>
  );
}
