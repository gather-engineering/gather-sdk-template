import { StoryObj, Meta } from '@storybook/react';
import { Dialog } from '.';
import { useState } from 'react';
import { Button } from '../button';

export default {
  title: 'Dialog',
  component: Dialog,
} as Meta<typeof Dialog>;

type Story = StoryObj<typeof Dialog>;

const ButtonToOpenDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="large" onClick={() => setOpen(true)} label="Open Dialog" />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <p>Hello World!</p>
      </Dialog>
    </>
  );
};

export const Showcase: Story = {
  render: () => <ButtonToOpenDialog />,
};
