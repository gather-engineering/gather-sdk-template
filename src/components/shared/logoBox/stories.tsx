import { StoryObj, Meta } from '@storybook/react';
import { LogoBox } from '.';
import gmailLogo from '@/assets/gmailLogo.svg';

export default {
  title: 'LogoBox',
  component: LogoBox,
} as Meta<typeof LogoBox>;

type Story = StoryObj<typeof LogoBox>;

export const Showcase: Story = {
  args: {
    logo: gmailLogo,
  },
};
