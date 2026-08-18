import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId, useRef, useState } from 'react';
import { IpponSingleCombobox } from '../src/combobox/IpponSingleCombobox.tsx';
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
  searchDemoOptions,
  toDemoMessage,
  toDemoOptions,
  toDemoPlaceholders,
  toDemoShown,
} from './comboboxDemo.tsx';
import { IpponErrorArea } from '../src/IpponErrorArea.tsx';
import { IpponText } from '../src/IpponText.tsx';

const ComboboxDemo = (props: DemoProps) => {
  const id = useId();
  const [query, setQuery] = useState('');
  const [selection, setSelection] = useState<DemoOption | undefined>(undefined);
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
        <IpponSingleCombobox
          id={id}
          describedBy={`${id}-helper`}
          labelledBy={`${id}-label`}
          query={query}
          onQueryChange={setQuery}
          options={shown}
          selection={selection}
          onSelect={setSelection}
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

const AsyncComboboxDemo = () => {
  const id = useId();
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<readonly DemoOption[]>([]);
  const [searching, setSearching] = useState(false);
  const [failed, setFailed] = useState(false);
  const [selection, setSelection] = useState<DemoOption | undefined>(undefined);
  const latestRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const onQueryChange = (next: string) => {
    setQuery(next);
    setSearching(true);
    setFailed(false);
    clearTimeout(timerRef.current);
    const ticket = latestRef.current + 1;
    latestRef.current = ticket;
    return new Promise<void>((resolve) => {
      timerRef.current = setTimeout(() => {
        void searchDemoOptions(next)
          .then(
            (found) => {
              if (ticket === latestRef.current) {
                setOptions(found);
                setSearching(false);
              }
            },
            () => {
              if (ticket === latestRef.current) {
                setFailed(true);
                setSearching(false);
              }
            },
          )
          .finally(resolve);
      }, 300);
    });
  };

  const toAsyncMessage = () => {
    if (searching) {
      return undefined;
    }
    if (failed) {
      return (
        <IpponErrorArea title="Search failed" description="Try again in a moment">
          <IpponButton variant="outline" onClick={() => onQueryChange(query)}>
            Retry
          </IpponButton>
        </IpponErrorArea>
      );
    }
    if (options.length > 0 || query === '') {
      return undefined;
    }
    return (
      <IpponText variant="body" size="small" color="neutral-tertiary-inversed">
        No option matches your search
      </IpponText>
    );
  };

  return (
    <IpponContainer>
      <IpponField>
        <IpponLabel id={`${id}-label`} htmlFor={id}>
          Label
        </IpponLabel>
        <IpponSingleCombobox
          id={id}
          describedBy={`${id}-helper`}
          labelledBy={`${id}-label`}
          query={query}
          onQueryChange={onQueryChange}
          options={options}
          selection={selection}
          onSelect={setSelection}
          placeholder="Type to search"
          message={toAsyncMessage()}
          placeholderRows={searching && options.length === 0 ? 5 : 0}
        />
        <IpponHelperText id={`${id}-helper`}>Results arrive after a delay</IpponHelperText>
      </IpponField>
    </IpponContainer>
  );
};

const meta = {
  title: 'Organism/SingleCombobox',
  component: ComboboxDemo,
  args: {
    helper: 'Helper text',
  },
  argTypes: demoArgTypes,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A combobox where a single option can be picked: the panel closes on the pick, the row carries a bare check glyph and no counter is drawn. It holds no data — the query, the filtering, the debouncing and the loading are the caller’s, which is what these stories wire around it.',
      },
    },
  },
} satisfies Meta<typeof ComboboxDemo>;

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
  parameters: {
    docs: {
      description: {
        story:
          'The combobox paginates nothing: it gives the caller a footer, inside the scrolling area and outside the `listbox`, and the caller puts its own "load more" button — or the sentinel of an infinite scroll — in it.',
      },
    },
  },
};

export const Asynchronous: Story = {
  render: () => <AsyncComboboxDemo />,
  parameters: {
    docs: {
      description: {
        story:
          '`onQueryChange` may hand back a promise, and the combobox carries `aria-busy` on the `listbox` for as long as the newest one is pending. That is the whole of what it knows about asynchronism — there is no hook to import and no search contract to satisfy. Everything else is written out in this story, because it belongs to the caller and to whatever data layer it already has: the debounce, the ticket that keeps a late answer from overwriting a newer one, the wording, and a retry that is nothing but calling `onQueryChange` again with the same query. The previous results stay on screen while the next search is in flight: the message is drawn beside the rows, never in their place, so the panel never flickers empty between two keystrokes.',
      },
    },
  },
};

export const Loading: Story = {
  args: { loading: true },
  parameters: {
    docs: {
      description: {
        story:
          'The very first load, when there is nothing on screen to keep: placeholder rows hold the shape of the list while the answer travels. Never a progress bar — nothing here knows how far along it is.',
      },
    },
  },
};

export const LoadingMore: Story = {
  args: { paginated: true, loadingMore: true },
  parameters: {
    docs: {
      description: {
        story:
          'The other kind of loading: what arrives is added, not substituted, so the placeholders go after the rows already there. A new search would keep its results on screen instead and change nothing but `aria-busy`, since replacing them would make the panel flicker at every keystroke.',
      },
    },
  },
};

export const Failed: Story = {
  args: { failed: true },
};

export const Error: Story = {
  args: { variant: 'error', helper: 'Pick an option' },
};

export const ReadOnly: Story = {
  args: { readOnly: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
