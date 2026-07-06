import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponInputText } from '../src/IpponInputText.tsx';

const meta = {
  title: 'Atom/InputText',
  component: IpponInputText,
  args: {
    placeholder: 'Placeholder',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [undefined, 'error', 'success'],
    },
  },
} satisfies Meta<typeof IpponInputText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: { variant: 'error', defaultValue: 'Value' },
};

export const Success: Story = {
  args: { variant: 'success', defaultValue: 'Value' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
