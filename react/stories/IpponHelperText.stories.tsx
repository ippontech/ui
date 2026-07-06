import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponHelperText } from '../src/IpponHelperText.tsx';

const meta = {
  title: 'Atom/HelperText',
  component: IpponHelperText,
  args: {
    children: 'Helper text',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [undefined, 'error', 'success'],
    },
  },
} satisfies Meta<typeof IpponHelperText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: { variant: 'error', children: 'Error message' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Success message' },
};
