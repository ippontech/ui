import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponHSpace, IpponHSpaceSlot } from '../src/IpponHSpace.tsx';
import { IpponBadge } from '../src/IpponBadge.tsx';

const meta = {
  title: 'Organism/HSpace',
  component: IpponHSpace,
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
  },
} satisfies Meta<typeof IpponHSpace>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Centered: Story = {
  args: { align: 'center' },
};

export const SpaceBetween: Story = {
  args: {
    align: 'space-between',
    children: (
      <>
        <IpponBadge color="information">Left</IpponBadge>
        <IpponBadge color="information">Right</IpponBadge>
      </>
    ),
  },
};

export const ExpandingSlot: Story = {
  args: {
    align: 'middle',
    children: (
      <>
        <IpponBadge color="information">Fixed</IpponBadge>
        <IpponHSpaceSlot expand>
          <IpponBadge color="neutral">Expanded slot</IpponBadge>
        </IpponHSpaceSlot>
        <IpponBadge color="information">Fixed</IpponBadge>
      </>
    ),
  },
};
