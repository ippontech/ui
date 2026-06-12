import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponButton } from '../src/IpponButton.tsx';

const meta = {
  title: 'Atom/Button',
  component: IpponButton,
  args: {
    children: 'Button',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['success', 'error', 'information', 'warning', 'neutral'],
    },
    variant: {
      control: 'select',
      options: ['secondary', 'outline', 'text'],
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof IpponButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Information: Story = {
  args: { color: 'information' },
};

export const Colors: Story = {
  render: (args) => (
    <>
      <IpponButton {...args} color="success">
        Success
      </IpponButton>{' '}
      <IpponButton {...args} color="error">
        Error
      </IpponButton>{' '}
      <IpponButton {...args} color="information">
        Information
      </IpponButton>{' '}
      <IpponButton {...args} color="warning">
        Warning
      </IpponButton>{' '}
      <IpponButton {...args} color="neutral">
        Neutral
      </IpponButton>
    </>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <>
      <IpponButton {...args} color="information">
        Primary
      </IpponButton>{' '}
      <IpponButton {...args} color="information" variant="secondary">
        Secondary
      </IpponButton>{' '}
      <IpponButton {...args} color="information" variant="outline">
        Outline
      </IpponButton>{' '}
      <IpponButton {...args} color="information" variant="text">
        Text
      </IpponButton>
    </>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <IpponButton {...args} color="information" size="small">
        Small
      </IpponButton>{' '}
      <IpponButton {...args} color="information">
        Default
      </IpponButton>{' '}
      <IpponButton {...args} color="information" size="large">
        Large
      </IpponButton>
    </>
  ),
};

export const WithIcons: Story = {
  args: {
    color: 'information',
    iconLeft: { name: 'add' },
    iconRight: { name: 'chevron-forward' },
  },
};

export const Disabled: Story = {
  args: { color: 'information', disabled: true },
};

export const Loading: Story = {
  args: {
    color: 'information',
    iconRight: { name: 'checkmark' },
    onClick: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
};
