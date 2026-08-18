import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponCheckbox } from '../src/IpponCheckbox.tsx';

const meta = {
  title: 'Atom/Checkbox',
  component: IpponCheckbox,
  args: {
    id: 'checkbox',
    children: 'Label',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [undefined, 'error'],
    },
  },
} satisfies Meta<typeof IpponCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Error: Story = {
  args: { variant: 'error' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
