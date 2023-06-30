import { StoryObj, Meta } from '@storybook/react';
import { Tag } from '.';

export default {
  title: 'Tag',
  component: Tag,
} as Meta<typeof Tag>;

type Story = StoryObj<typeof Tag>;

export const Showcase: Story = {
  args: {
    tag: 'Hey there',
  },
};
