import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponTitleDisplay } from '../src/IpponTitleDisplay.tsx';

const meta = {
  title: 'Atom/Title display',
  component: IpponTitleDisplay,
  args: {
    tag: 'h1',
    children: 'Display title',
  },
  argTypes: {
    size: {
      control: 'select',
      options: [undefined, 'large', 'medium', 'small'],
    },
    color: {
      control: 'select',
      options: [
        undefined,
        'brand-primary',
        'neutral-tertiary',
        'success-primary',
        'error-primary',
        'warning-primary',
        'information-primary',
      ],
    },
  },
} satisfies Meta<typeof IpponTitleDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <>
      <IpponTitleDisplay tag="h1">Large display (h1)</IpponTitleDisplay>
      <IpponTitleDisplay tag="h2">Medium display (h2)</IpponTitleDisplay>
      <IpponTitleDisplay tag="h3">Small display (h3)</IpponTitleDisplay>
    </>
  ),
};

export const StyledAsSmall: Story = {
  args: { tag: 'h1', size: 'small', children: 'h1 styled as small' },
};

export const Colored: Story = {
  args: { tag: 'h2', color: 'brand-primary', children: 'Brand display title' },
};
