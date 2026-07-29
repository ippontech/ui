import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponButton } from '../src/IpponButton.tsx';
import { IpponErrorArea } from '../src/IpponErrorArea.tsx';

const stackTrace = `TypeError: Cannot read properties of undefined (reading 'id')
    at renderItem (list.js:42:18)
    at Array.map (<anonymous>)
    at ItemList (list.js:35:24)`;

const meta = {
  title: 'Molecule/ErrorArea',
  component: IpponErrorArea,
  args: {
    title: 'Loading error',
    description: 'Something went wrong. Please try again.',
  },
  argTypes: {
    children: { control: false },
    detailLabel: { control: 'text' },
    detailMessage: { control: 'text' },
    language: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The padding widens on wide zones through a container query, so the block needs an `IpponContainer` ancestor to measure against. The stories below have none, which is why they keep the narrow padding whatever the viewport does.',
      },
    },
  },
} satisfies Meta<typeof IpponErrorArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    children: (
      <IpponButton variant="outline" color="neutral">
        Retry
      </IpponButton>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'The component ships no retry behavior: whatever is passed as children is rendered under the description. Wire the button to your own reload:',
      },
      source: {
        language: 'tsx',
        code: `<IpponErrorArea title="Loading error" description="Something went wrong. Please try again.">
  <IpponButton variant="outline" color="neutral" onClick={reload}>
    Retry
  </IpponButton>
</IpponErrorArea>;`,
      },
    },
  },
};

export const WithDetail: Story = {
  args: {
    detailLabel: 'Show details',
    detailMessage: stackTrace,
    children: (
      <IpponButton variant="outline" color="neutral">
        Retry
      </IpponButton>
    ),
  },
};

export const WithError: Story = {
  args: {
    detailLabel: 'Show details',
    detailMessage: Object.assign(
      new TypeError("Cannot read properties of undefined (reading 'id')"),
      {
        stack: stackTrace,
      },
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'An `Error` is accepted directly: the component renders its `stack`, falling back to its `message` when the runtime provides no stack.',
      },
      source: {
        language: 'tsx',
        code: `<IpponErrorArea
  title="Loading error"
  description="Something went wrong. Please try again."
  detailLabel="Show details"
  detailMessage={error}
/>;`,
      },
    },
  },
};
