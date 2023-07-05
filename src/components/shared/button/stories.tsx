import { StoryObj, Meta } from "@storybook/react";
import { Button } from ".";
import {
  faCheck,
  faExclamationCircle,
  faSpinner as faLoader,
} from "@fortawesome/free-solid-svg-icons";

export default {
  title: "Button",
  component: Button,
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Download: Story = {
  args: {
    label: "Download",
    size: "large",
    variant: "contained",
  },
};

export const NeedToLogin: Story = {
  args: {
    label: "Need To Login",
    size: "large",
    variant: "contained",
    error: true,
    startIcon: faExclamationCircle,
  },
};

export const Downloading: Story = {
  args: {
    label: "Downloading",
    size: "large",
    variant: "contained",
    startIcon: faLoader,
    loading: true,
  },
};

export const Downloaded: Story = {
  args: {
    label: "Downloaded",
    size: "large",
    variant: "contained",
    loading: false,
    startIcon: faCheck,
    startIconColor: "#36B37E",
  },
};

export const Outlined: Story = {
  args: {
    label: "Download",
    size: "large",
    variant: "outlined",
    loading: false,
  },
};

export const TextButtonWithColor: Story = {
  args: {
    label: "Download",
    size: "large",
    variant: "text",
    loading: false,
    styles: {
      color: "red",
    },
  },
};
