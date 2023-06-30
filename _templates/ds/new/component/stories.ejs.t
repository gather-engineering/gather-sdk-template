---
to: src/components/<%= h.changeCase.camelCase(name) %>Importer/stories.tsx
---
import { StoryObj, Meta } from '@storybook/react';
import <%= h.changeCase.pascalCase(name) %>ImporterComponent from '.';

export default {
  title: '<%= h.changeCase.pascalCase(name) %>ImporterComponent',
  component: <%= h.changeCase.pascalCase(name) %>ImporterComponent,
} as Meta<typeof <%= h.changeCase.pascalCase(name) %>ImporterComponent>;

type Story = StoryObj<typeof <%= h.changeCase.pascalCase(name) %>ImporterComponent>;

export const Showcase: Story = {
  args: {
    title: '<%= h.changeCase.pascalCase(name) %>',
    categories: [''],
  },
};

export const WithDefaultPopup: Story = {
  render: () => {
    return <<%= h.changeCase.pascalCase(name) %>ImporterComponent title="<%= h.changeCase.pascalCase(name) %>" categories={['']} />;
  },
};
