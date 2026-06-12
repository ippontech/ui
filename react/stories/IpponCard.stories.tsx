import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponCard } from '../src/IpponCard.tsx';
import { IpponText } from '../src/IpponText.tsx';

const meta = {
  title: 'Organism/Card',
  component: IpponCard,
  args: {
    children: <IpponText variant="body">Card content</IpponText>,
  },
  argTypes: {
    children: { control: false },
    shadow: {
      control: 'select',
      options: [undefined, 'l1', 'l2', 'l3', 'l4', 'l5', 'l6'],
    },
    size: {
      control: 'select',
      options: [undefined, 'small', 'large'],
    },
  },
} satisfies Meta<typeof IpponCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Bordered: Story = {
  args: { border: true },
};

export const WithShadow: Story = {
  args: { shadow: 'l3' },
};

export const Large: Story = {
  args: { size: 'large', border: true },
};
