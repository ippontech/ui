import type { ReactNode } from 'react';
import type { IpponComboboxOption } from '../src/index.ts';
import { IpponErrorArea } from '../src/IpponErrorArea.tsx';
import { IpponText } from '../src/IpponText.tsx';

export type DemoOption = IpponComboboxOption & {
  group: string;
};

export type DemoProps = {
  variant?: 'error' | 'success';
  helper: string;
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  loadingMore?: boolean;
  failed?: boolean;
  withDescription?: boolean;
  disabledOption?: boolean;
  paginated?: boolean;
};

export const demoOptions: DemoOption[] = [
  { key: '1', label: 'Option 1', group: 'First group' },
  { key: '2', label: 'Option 2', group: 'First group' },
  { key: '3', label: 'Option 3', group: 'First group' },
  { key: '4', label: 'Option 4', group: 'Second group' },
  { key: '5', label: 'Option 5', group: 'Second group' },
  { key: '6', label: 'Option 6', group: 'Second group' },
  { key: '7', label: 'Option 7', group: 'Second group' },
];

export const pageSize = 3;

export const matches = (option: DemoOption, query: string): boolean =>
  option.label.toLowerCase().includes(query.trim().toLowerCase());

export const searchDemoOptions = (query: string): Promise<readonly DemoOption[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(demoOptions.filter((option) => matches(option, query))), 600);
  });

export const toDemoOptions = (props: DemoProps): DemoOption[] =>
  demoOptions.map((option) => ({
    ...option,
    description: props.withDescription ? option.group : undefined,
    disabled: props.disabledOption && option.key === '2',
  }));

const emptyMessage = (
  <IpponText variant="body" size="small" color="neutral-tertiary-inversed">
    No option matches your search
  </IpponText>
);

const failedMessage = (
  <IpponErrorArea
    title="Options could not be loaded"
    description="Check your connection and try again"
  />
);

export const toDemoMessage = (props: DemoProps, shownCount: number): ReactNode => {
  if (props.failed) {
    return failedMessage;
  }
  if (props.loading || props.loadingMore) {
    return undefined;
  }
  return shownCount === 0 ? emptyMessage : undefined;
};

export const toDemoPlaceholders = (props: DemoProps): number => {
  if (props.loading) {
    return 5;
  }
  return props.loadingMore ? 2 : 0;
};

export const toDemoShown = (props: DemoProps, paged: DemoOption[]): DemoOption[] =>
  props.loading ? [] : paged;

export const demoArgTypes = {
  variant: {
    control: 'inline-radio' as const,
    options: [undefined, 'error', 'success'],
  },
};
