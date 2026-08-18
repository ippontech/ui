import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponOptionList } from '../src/IpponOptionList.tsx';
import { IpponOption } from '../src/IpponOption.tsx';
import { IpponProgress } from '../src/IpponProgress.tsx';
import { IpponText } from '../src/IpponText.tsx';
import { IpponErrorArea } from '../src/IpponErrorArea.tsx';
import { IpponContainer } from '../src/IpponContainer.tsx';
import { IpponButton } from '../src/IpponButton.tsx';

const options = [1, 2, 3, 4, 5, 6].map((index) => ({
  id: `picker-option-${index}`,
  label: `Option ${index}`,
}));

const meta = {
  title: 'Molecule/OptionList',
  component: IpponOptionList,
  args: {
    id: 'picker-listbox',
    multiple: true,
    children: options.map((option) => (
      <IpponOption key={option.id} id={option.id} label={option.label} />
    )),
  },
  argTypes: {
    children: { control: false },
    message: { control: false },
    footer: { control: false },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof IpponOptionList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Paginated: Story = {
  args: {
    footer: (
      <IpponButton variant="text" color="neutral">
        Load more
      </IpponButton>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'The footer sits inside the scrolling area and outside the `listbox`, so a sentinel put there only comes into view once the reader has reached the end of the list.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    busy: true,
    message: <IpponProgress value={30} min={0} max={100} label="Loading options" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The message sits beside the rows, not in their place, so the results of the previous search stay readable while the next one is in flight instead of the panel emptying at every keystroke.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    children: null,
    message: (
      <IpponText variant="body" size="small" color="neutral-tertiary-inversed">
        No option matches your search
      </IpponText>
    ),
  },
};

export const Failed: Story = {
  args: {
    children: null,
    message: (
      <IpponErrorArea
        title="Options could not be loaded"
        description="Check your connection and try again"
      />
    ),
  },
  render: (args) => (
    <IpponContainer>
      <IpponOptionList {...args} />
    </IpponContainer>
  ),
};
