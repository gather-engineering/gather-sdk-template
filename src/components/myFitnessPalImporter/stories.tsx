import { StoryObj, Meta } from '@storybook/react';
import MyFitnessPalImporterComponent from '.';

export default {
  title: 'MyFitnessPalImporterComponent',
  component: MyFitnessPalImporterComponent,
} as Meta<typeof MyFitnessPalImporterComponent>;

type Story = StoryObj<typeof MyFitnessPalImporterComponent>;

export const Showcase: Story = {
  args: {
    title: 'MyFitnessPal',
    categories: [''],
  },
};

export const WithDefaultPopup: Story = {
  render: () => {
    return <MyFitnessPalImporterComponent title="MyFitnessPal" categories={['']} />;
  },
};
