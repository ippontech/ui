import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponGrid, IpponGridSlot } from '../src/IpponGrid.tsx';
import { IpponCard } from '../src/IpponCard.tsx';
import { IpponText } from '../src/IpponText.tsx';

const Cell = ({ label }: { label: string }) => (
  <IpponCard border>
    <IpponText variant="body">{label}</IpponText>
  </IpponCard>
);

const meta = {
  title: 'Organism/Grid',
  component: IpponGrid,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof IpponGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TwelveColumns: Story = {
  args: {
    media: 12,
    gap: 16,
    children: (
      <>
        <IpponGridSlot col={6}>
          <Cell label="col 6" />
        </IpponGridSlot>
        <IpponGridSlot col={6}>
          <Cell label="col 6" />
        </IpponGridSlot>
        <IpponGridSlot col={4}>
          <Cell label="col 4" />
        </IpponGridSlot>
        <IpponGridSlot col={4}>
          <Cell label="col 4" />
        </IpponGridSlot>
        <IpponGridSlot col={4}>
          <Cell label="col 4" />
        </IpponGridSlot>
      </>
    ),
  },
};

export const Responsive: Story = {
  args: {
    media: [4, 'desktop-s-12'],
    gap: 16,
    children: (
      <>
        <IpponGridSlot col={[4, 'desktop-s-6']}>
          <Cell label="4 / desktop 6" />
        </IpponGridSlot>
        <IpponGridSlot col={[4, 'desktop-s-6']}>
          <Cell label="4 / desktop 6" />
        </IpponGridSlot>
      </>
    ),
  },
};
