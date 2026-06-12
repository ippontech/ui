import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponContainer } from '../src/IpponContainer.tsx';
import { IpponText } from '../src/IpponText.tsx';

const meta = {
  title: 'Organism/Container',
  component: IpponContainer,
  args: {
    children: <IpponText variant="body">Centered, width-constrained content</IpponText>,
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof IpponContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AsSection: Story = {
  args: { tag: 'section' },
};
