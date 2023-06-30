import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import React, { CSSProperties } from 'react';
import { Interpolation } from 'styled-components';

export interface OnClickHandler {
  (event: React.MouseEvent<HTMLElement>): void;
}

export interface OnUploadHandler {
  (file: File): void;
}

export interface ButtonProps {
  label?: string;
  size: 'large' | 'medium' | 'small';
  variant?: 'outlined' | 'contained' | 'text';
  startIcon?: IconDefinition;
  startIconColor?: string;
  isLoading?: boolean;
  error?: boolean;
  disabled?: boolean;
  styles?: Interpolation<CSSProperties>;
  onClick?: OnClickHandler;
  onUpload?: OnUploadHandler;
  children?: React.ReactNode;
}
