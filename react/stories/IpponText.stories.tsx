import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponText } from '../src/IpponText.tsx';

const meta = {
  title: 'Atom/Text',
  component: IpponText,
  args: {
    variant: 'body',
    children: 'The quick brown fox jumps over the lazy dog',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['body', 'label'],
    },
    size: {
      control: 'select',
      options: [undefined, 'small', 'large'],
    },
  },
} satisfies Meta<typeof IpponText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Body: Story = {};

export const BodyBold: Story = {
  args: { variant: 'body', weight: 'bold' },
};

export const Label: Story = {
  args: { variant: 'label', children: 'Label text' },
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <IpponText {...args} variant="body" size="small">
        Small body
      </IpponText>
      <br />
      <IpponText {...args} variant="body">
        Default body
      </IpponText>
      <br />
      <IpponText {...args} variant="body" size="large">
        Large body
      </IpponText>
    </>
  ),
};

export const Placeholder: Story = {
  args: { placeholder: true },
};
