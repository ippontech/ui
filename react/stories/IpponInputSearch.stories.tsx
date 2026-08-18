import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponInputSearch } from '../src/IpponInputSearch.tsx';
import { IpponBadge } from '../src/IpponBadge.tsx';
import { classicIconNames } from './iconNames.ts';

const iconMapping = Object.fromEntries(classicIconNames.map((name) => [name, { name }]));

const meta = {
  title: 'Atom/InputSearch',
  component: IpponInputSearch,
  args: {
    placeholder: 'Placeholder',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [undefined, 'error', 'success'],
    },
    icon: {
      control: 'select',
      options: classicIconNames,
      mapping: iconMapping,
    },
    suffix: { control: false },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof IpponInputSearch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Suffix: Story = {
  args: {
    suffix: <IpponBadge iconRight={{ name: 'close', label: 'Clear selection' }}>2</IpponBadge>,
  },
};

export const Error: Story = {
  args: { variant: 'error' },
};

export const Success: Story = {
  args: { variant: 'success', defaultValue: 'Value' },
};

export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: 'Value' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
