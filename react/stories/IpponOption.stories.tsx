import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponOption } from '../src/IpponOption.tsx';
import { IpponBadge } from '../src/IpponBadge.tsx';

const meta = {
  title: 'Molecule/Option',
  component: IpponOption,
  args: {
    id: 'picker-option-1',
    label: 'Option',
  },
  argTypes: {
    children: { control: false },
  },
  render: (args) => (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      <IpponOption {...args} />
    </ul>
  ),
} satisfies Meta<typeof IpponOption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

export const Active: Story = {
  args: { active: true },
};

export const Single: Story = {
  args: { selected: true, single: true },
};

export const Description: Story = {
  args: { description: 'Secondary text' },
};

export const Suffix: Story = {
  args: { children: <IpponBadge color="neutral">Badge</IpponBadge> },
};

export const Disabled: Story = {
  args: { disabled: true },
};
