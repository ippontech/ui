import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponButtonCard } from '../src/IpponButtonCard.tsx';
import { IpponText } from '../src/IpponText.tsx';

const meta = {
  title: 'Organism/ButtonCard',
  component: IpponButtonCard,
  args: {
    children: <IpponText variant="body">Clickable card</IpponText>,
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
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof IpponButtonCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { border: true },
};

export const WithShadow: Story = {
  args: { shadow: 'l2' },
};

export const FullWidth: Story = {
  args: { border: true, fullWidth: true },
};
