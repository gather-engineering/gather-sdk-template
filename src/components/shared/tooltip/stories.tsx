import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import Tooltip from '.';

export default {
  title: 'Tooltip',
  component: Tooltip,
} as Meta<typeof Tooltip>;

type Story = StoryObj<typeof Tooltip>;

export const Showcase: Story = {
  args: {
    title: 'Tooltip',
    children: 'Hover me',
    placement: 'top',
  },
};
