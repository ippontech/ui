import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponLinkButtonCard } from '../src/IpponLinkButtonCard.tsx';
import { IpponText } from '../src/IpponText.tsx';

const meta = {
  title: 'Organism/LinkButtonCard',
  component: IpponLinkButtonCard,
  args: {
    children: <IpponText variant="body">Card that navigates to a page</IpponText>,
    href: '#',
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
    color: {
      control: 'select',
      options: [undefined, 'success', 'error', 'information', 'warning'],
    },
  },
} satisfies Meta<typeof IpponLinkButtonCard>;

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
