import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponLabel } from '../src/IpponLabel.tsx';

const meta = {
  title: 'Atom/Label',
  component: IpponLabel,
  args: {
    children: 'Label',
  },
} satisfies Meta<typeof IpponLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
