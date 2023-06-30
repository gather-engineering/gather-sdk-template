import { StoryObj, Meta } from '@storybook/react';
import { Stack } from '.';

export default {
  title: 'Stack',
  component: Stack,
} as Meta<typeof Stack>;

type Story = StoryObj<typeof Stack>;

export const StackColumnAlignStart: Story = {
  args: {
    styles: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexGrow: 1,
    },
  },
};
