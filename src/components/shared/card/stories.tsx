import { StoryObj, Meta } from '@storybook/react';
import { Card } from '.';

export default {
  title: 'Card',
  component: Card,
} as Meta<typeof Card>;

type Story = StoryObj<typeof Card>;

export const Showcase: Story = {};
