import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponIconTile } from '../src/IpponIconTile.tsx';
import { allIconNames } from './iconNames.ts';

const iconMapping = Object.fromEntries(allIconNames.map((name) => [name, { name }]));

const meta = {
  title: 'Atom/IconTile',
  component: IpponIconTile,
  args: {
    icon: { name: 'hardware-chip' },
  },
  argTypes: {
    icon: {
      control: 'select',
      options: allIconNames,
      mapping: iconMapping,
    },
    color: {
      control: 'select',
      options: [undefined, 'success', 'error', 'information', 'warning', 'neutral'],
    },
    size: {
      control: 'select',
      options: [undefined, 'small', 'large'],
    },
  },
} satisfies Meta<typeof IpponIconTile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Colors: Story = {
  render: (args) => (
    <>
      <IpponIconTile {...args} /> <IpponIconTile {...args} color="success" />{' '}
      <IpponIconTile {...args} color="error" /> <IpponIconTile {...args} color="information" />{' '}
      <IpponIconTile {...args} color="warning" /> <IpponIconTile {...args} color="neutral" />
    </>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <IpponIconTile {...args} size="small" /> <IpponIconTile {...args} />{' '}
      <IpponIconTile {...args} size="large" />
    </>
  ),
};

export const Outline: Story = {
  args: { icon: { name: 'hardware-chip', variant: 'outline' }, size: 'large' },
};
