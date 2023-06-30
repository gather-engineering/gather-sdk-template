import { StoryObj, Meta } from '@storybook/react';
import AmazonImporterComponent from '.';

export default {
  title: 'AmazonImporterComponent',
  component: AmazonImporterComponent,
} as Meta<typeof AmazonImporterComponent>;

type Story = StoryObj<typeof AmazonImporterComponent>;

export const Showcase: Story = {
  args: {
    title: 'Amazon',
    categories: [''],
  },
};

export const WithDefaultPopup: Story = {
  render: () => {
    return <AmazonImporterComponent title="Amazon" categories={['']} />;
  },
};
