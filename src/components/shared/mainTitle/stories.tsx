import { StoryObj, Meta } from '@storybook/react';
import { MainTitle } from '.';

export default {
  title: 'MainTitle',
  component: MainTitle,
} as Meta<typeof MainTitle>;

type Story = StoryObj<typeof MainTitle>;

export const Showcase: Story = {
  args: {
    title: 'Main Title',
  },
};
