import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponIcon } from '../src/IpponIcon.tsx';
import { allIconNames } from './iconNames.ts';

const meta = {
  title: 'Atom/Icon',
  component: IpponIcon,
  args: {
    name: 'heart',
  },
  argTypes: {
    name: {
      control: 'select',
      options: allIconNames,
    },
    variant: {
      control: 'select',
      options: [undefined, 'sharp', 'outline'],
    },
    color: {
      control: 'select',
      options: [
        undefined,
        'brand-primary',
        'success-primary',
        'error-primary',
        'warning-primary',
        'information-primary',
      ],
    },
    size: {
      control: 'select',
      options: [16, 20, 24, 32, 48],
    },
  },
} satisfies Meta<typeof IpponIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Pick any icon from the `name` dropdown. Classic icons support the
// `sharp` / `outline` variants; logo icons (`logo-*`) have no variant.
export const Variants: Story = {
  render: (args) => (
    <>
      <IpponIcon {...args} name="heart" />
      <IpponIcon {...args} name="heart" variant="sharp" />
      <IpponIcon {...args} name="heart" variant="outline" />
    </>
  ),
  args: { size: 32 },
};

export const Colored: Story = {
  args: { name: 'checkmark', color: 'success-primary', size: 32 },
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <IpponIcon {...args} size={16} />
      <IpponIcon {...args} size={24} />
      <IpponIcon {...args} size={32} />
      <IpponIcon {...args} size={48} />
    </>
  ),
  args: { name: 'star', color: 'warning-primary' },
};
