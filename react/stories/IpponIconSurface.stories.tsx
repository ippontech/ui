import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponIcon } from '../src/IpponIcon.tsx';
import { IpponIconSurface } from '../src/IpponIconSurface.tsx';

const meta = {
  title: 'Atom/IconSurface',
  component: IpponIconSurface,
  args: {
    children: <IpponIcon name="document-text" variant="outline" size={24} />,
  },
  argTypes: {
    children: { control: false },
    color: {
      control: 'select',
      options: [undefined, 'success', 'error', 'information', 'warning'],
    },
  },
} satisfies Meta<typeof IpponIconSurface>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ErrorColor: Story = {
  args: {
    color: 'error',
    children: <IpponIcon name="warning" variant="outline" size={24} />,
  },
};
