import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponIon } from '../src/IpponIon.tsx';
import { allIconNames } from './iconNames.ts';

const meta = {
  title: 'Atom/Ion',
  component: IpponIon,
  args: {
    name: 'home',
  },
  argTypes: {
    name: {
      control: 'select',
      options: allIconNames,
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof IpponIon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sharp: Story = {
  args: { name: 'settings', variant: 'sharp' },
};

export const Clickable: Story = {
  args: { name: 'trash', onClick: () => {} },
};
