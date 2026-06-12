import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponTitle } from '../src/IpponTitle.tsx';

const meta = {
  title: 'Atom/Title',
  component: IpponTitle,
  args: {
    tag: 'h1',
    children: 'Section title',
  },
} satisfies Meta<typeof IpponTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Levels: Story = {
  render: () => (
    <>
      <IpponTitle tag="h1" level={1}>
        Level 1
      </IpponTitle>
      <IpponTitle tag="h2" level={2}>
        Level 2
      </IpponTitle>
      <IpponTitle tag="h3" level={3}>
        Level 3
      </IpponTitle>
      <IpponTitle tag="h4" level={4}>
        Level 4
      </IpponTitle>
      <IpponTitle tag="h5" level={5}>
        Level 5
      </IpponTitle>
    </>
  ),
};

export const StyledAsLevel3: Story = {
  args: { tag: 'h1', level: 3, children: 'h1 styled as level 3' },
};

export const Placeholder: Story = {
  args: { tag: 'h2', placeholder: true },
};
