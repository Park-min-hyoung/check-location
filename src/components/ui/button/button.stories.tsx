import { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"]
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    size: "default"
  },
  render: ({ size }) => (
    <div style={{ width: "300px" }}>
      <Button size={size}>테스트</Button>
    </div>
  )
};
