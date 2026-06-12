import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponVSpace, IpponVSpaceSlot } from '../src/IpponVSpace.tsx';
import { IpponBadge } from '../src/IpponBadge.tsx';

const meta = {
  title: 'Organism/VSpace',
  component: IpponVSpace,
  args: {
    gap: 8,
    children: (
      <>
        <IpponBadge color="information">One</IpponBadge>
        <IpponBadge color="information">Two</IpponBadge>
        <IpponBadge color="information">Three</IpponBadge>
      </>
    ),
  },
  argTypes: {
    children: { control: false },
    gap: {
      control: 'select',
      options: [4, 8, 16, 24, 32],
    },
    align: {
      control: 'select',
      options: [undefined, 'left', 'center', 'justify', 'right'],
    },
  },
} satisfies Meta<typeof IpponVSpace>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Centered: Story = {
  args: { align: 'center' },
};

export const AlignedSlot: Story = {
  args: {
    children: (
      <>
        <IpponBadge color="information">Default align</IpponBadge>
        <IpponVSpaceSlot align="right">
          <IpponBadge color="neutral">Right-aligned slot</IpponBadge>
        </IpponVSpaceSlot>
      </>
    ),
  },
};
