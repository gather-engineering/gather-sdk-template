import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { Alert } from '.';

export default {
  title: 'Alert',
  component: Alert,
} as Meta<typeof Alert>;

type Story = StoryObj<typeof Alert>;

export const Showcase: Story = {
  args: {
    severity: 'info',
    icon: null,
    children: 'This is an alert',
  },
};
