import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { Typography } from '.';

export default {
  title: 'Typography',
  component: Typography,
} as Meta<typeof Typography>;

type Story = StoryObj<typeof Typography>;

export const Showcase: Story = {
  args: {},
};
