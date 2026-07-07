import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponLinkButton } from '../src/IpponLinkButton.tsx';

const meta = {
  title: 'Atom/LinkButton',
  component: IpponLinkButton,
  args: {
    children: 'Link button',
    href: '#',
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
  },
} satisfies Meta<typeof IpponLinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <>
      <IpponLinkButton {...args} color="information">
        Primary
      </IpponLinkButton>{' '}
      <IpponLinkButton {...args} color="information" variant="secondary">
        Secondary
      </IpponLinkButton>{' '}
      <IpponLinkButton {...args} color="information" variant="outline">
        Outline
      </IpponLinkButton>{' '}
      <IpponLinkButton {...args} color="information" variant="text">
        Text
      </IpponLinkButton>
    </>
  ),
};

export const WithIcons: Story = {
  args: {
    color: 'information',
    iconLeft: { name: 'open' },
    iconRight: { name: 'chevron-forward' },
  },
};
