import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponMeter } from '../src/IpponMeter.tsx';

const meta = {
  title: 'Atom/Meter',
  component: IpponMeter,
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    value: 60,
    min: 0,
    max: 100,
    label: 'Disk usage',
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
} satisfies Meta<typeof IpponMeter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { value: 0 },
};

export const Full: Story = {
  args: { value: 100 },
};
