import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { Box } from '.';

export default {
  title: 'Box',
  component: Box,
} as Meta<typeof Box>;

type Story = StoryObj<typeof Box>;

export const Showcase: Story = {
  args: {
    component: 'div',
    styles: `
      background-color: #f00;
      width: 100px;
      height: 100px;
    `,
  },
};
