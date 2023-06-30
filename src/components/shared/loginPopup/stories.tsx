import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { LoginPopup } from '.';
import gmailLogo from '@/assets/gmailLogo.svg';

export default {
  title: 'LoginPopup',
  component: LoginPopup,
} as Meta<typeof LoginPopup>;

type Story = StoryObj<typeof LoginPopup>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    onConfirm: () => {},
    logo: gmailLogo,
    dataSourceTitle: 'Gmail',
    state: {},
  },
};

export const Error: Story = {
  args: {
    open: true,
    onClose: () => {},
    onConfirm: () => {},
    logo: gmailLogo,
    dataSourceTitle: 'Gmail',
    state: {
      errorState: true,
    },
  },
};

export const PendingAuth: Story = {
  args: {
    open: true,
    onClose: () => {},
    onConfirm: () => {},
    logo: gmailLogo,
    dataSourceTitle: 'Gmail',
    state: {
      authState: 'pendingAuth',
    },
  },
};

export const Authenticated: Story = {
  args: {
    open: true,
    onClose: () => {},
    onConfirm: () => {},
    logo: gmailLogo,
    dataSourceTitle: 'Gmail',
    state: {
      authState: 'authenticated',
    },
  },
};
