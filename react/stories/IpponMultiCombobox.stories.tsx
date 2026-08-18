import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId, useState } from 'react';
import { IpponMultiCombobox } from '../src/combobox/IpponMultiCombobox.tsx';
import { IpponButton } from '../src/IpponButton.tsx';
import { IpponContainer } from '../src/IpponContainer.tsx';
import { IpponField } from '../src/IpponField.tsx';
import { IpponHelperText } from '../src/IpponHelperText.tsx';
import { IpponLabel } from '../src/IpponLabel.tsx';
import type { DemoOption, DemoProps } from './comboboxDemo.tsx';
import {
  demoArgTypes,
  matches,
  pageSize,
  toDemoMessage,
  toDemoOptions,
  toDemoPlaceholders,
  toDemoShown,
} from './comboboxDemo.tsx';

const MultiComboboxDemo = (props: DemoProps) => {
  const id = useId();
  const [query, setQuery] = useState('');
  const [selection, setSelection] = useState<DemoOption[]>([]);
  const [page, setPage] = useState(1);

  const matching = toDemoOptions(props).filter((option) => matches(option, query));
  const paged = props.paginated ? matching.slice(0, page * pageSize) : matching;
  const shown = toDemoShown(props, paged);

  return (
    <IpponContainer>
      <IpponField>
        <IpponLabel id={`${id}-label`} htmlFor={id}>
          Label
        </IpponLabel>
        <IpponMultiCombobox
          id={id}
          describedBy={`${id}-helper`}
          labelledBy={`${id}-label`}
          query={query}
          onQueryChange={setQuery}
          options={shown}
          selection={selection}
          onSelectionChange={setSelection}
          labels={{
            selection: (count) => `${count} options selected`,
            clear: 'Clear selection',
          }}
          placeholder="Placeholder"
          variant={props.variant}
          disabled={props.disabled}
          readOnly={props.readOnly}
          message={toDemoMessage(props, shown.length)}
          placeholderRows={toDemoPlaceholders(props)}
          footer={
            props.paginated && paged.length < matching.length ? (
              <IpponButton variant="text" color="neutral" onClick={() => setPage(page + 1)}>
                {`Load more (${paged.length} of ${matching.length})`}
              </IpponButton>
            ) : undefined
          }
        />
        <IpponHelperText id={`${id}-helper`} variant={props.variant}>
          {props.helper}
        </IpponHelperText>
      </IpponField>
    </IpponContainer>
  );
};

const meta = {
  title: 'Organism/MultiCombobox',
  component: MultiComboboxDemo,
  args: {
    helper: 'Helper text',
  },
  argTypes: demoArgTypes,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A combobox where several options can be picked: the panel stays open on a pick, every row carries a check box, and one counter badge with a clear cross stands for the whole selection. Pick an option to see it appear — the design has no removable chip per value.',
      },
    },
  },
} satisfies Meta<typeof MultiComboboxDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { withDescription: true },
};

export const DisabledOption: Story = {
  args: { disabledOption: true },
};

export const Paginated: Story = {
  args: { paginated: true },
};

export const Loading: Story = {
  args: { loading: true },
};

export const LoadingMore: Story = {
  args: { paginated: true, loadingMore: true },
};

export const Failed: Story = {
  args: { failed: true },
};

export const Error: Story = {
  args: { variant: 'error', helper: 'Pick at least one option' },
};

export const ReadOnly: Story = {
  args: { readOnly: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
