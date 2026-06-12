import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponBadge } from '../src/IpponBadge.tsx';

const meta = {
  title: 'Atom/Badge',
  component: IpponBadge,
  args: {
    children: 'Badge',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['brand', 'neutral', 'success', 'error', 'warning', 'information'],
    },
    variant: {
      control: 'select',
      options: [undefined, 'secondary'],
    },
  },
} satisfies Meta<typeof IpponBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Colors: Story = {
  render: (args) => (
    <>
      <IpponBadge {...args} color="brand">
        Brand
      </IpponBadge>{' '}
      <IpponBadge {...args} color="neutral">
        Neutral
      </IpponBadge>{' '}
      <IpponBadge {...args} color="success">
        Success
      </IpponBadge>{' '}
      <IpponBadge {...args} color="error">
        Error
      </IpponBadge>{' '}
      <IpponBadge {...args} color="warning">
        Warning
      </IpponBadge>{' '}
      <IpponBadge {...args} color="information">
        Information
      </IpponBadge>
    </>
  ),
};

export const Secondary: Story = {
  args: { color: 'information', variant: 'secondary' },
};

export const WithIcons: Story = {
  args: {
    color: 'information',
    iconLeft: { name: 'information-circle' },
    iconRight: { name: 'close', onClick: () => {} },
  },
};

export const Placeholder: Story = {
  args: { placeholder: true },
};
