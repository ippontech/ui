import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponProgress } from '../src/IpponProgress.tsx';

const meta = {
  title: 'Atom/Progress',
  component: IpponProgress,
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    value: 40,
    min: 0,
    max: 100,
    label: 'Upload progress',
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
} satisfies Meta<typeof IpponProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InProgress: Story = {};

export const Complete: Story = {
  args: { value: 100 },
};
