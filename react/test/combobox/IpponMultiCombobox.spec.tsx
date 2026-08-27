import type { ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, configure, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import type { IpponComboboxOption, IpponMultiComboboxLabels } from '../../src';
import { IpponMultiCombobox } from '../../src';

configure({
  testIdAttribute: 'data-selector',
});

const options: IpponComboboxOption[] = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2' },
  { key: '3', label: 'Option 3' },
];

const noop = () => undefined;

const defaultLabels: IpponMultiComboboxLabels = {
  selection: (count) => `${count} options selected`,
  clear: 'Clear selection',
};

type MultiComboboxOverrides = {
  query?: string;
  options?: IpponComboboxOption[];
  selection?: IpponComboboxOption[];
  labels?: IpponMultiComboboxLabels;
  message?: ReactNode;
  footer?: ReactNode;
  onSelectionChange?: (selection: IpponComboboxOption[]) => void;
};

const MultiCombobox = (props: MultiComboboxOverrides) => (
  <IpponMultiCombobox
    dataSelector="ippon-combobox"
    id="picker"
    query={props.query ?? ''}
    onQueryChange={noop}
    options={props.options ?? options}
    selection={props.selection ?? []}
    onSelectionChange={props.onSelectionChange ?? noop}
    labels={props.labels ?? defaultLabels}
    message={props.message}
    footer={props.footer}
  />
);

const getInput = () => screen.getByRole('combobox');

const getOptions = () => screen.getByTestId('ippon-combobox.option-list.options');

const openCombobox = () => fireEvent.focus(getInput());

describe('IpponMultiCombobox', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(<MultiCombobox />);

    expect(getInput()).toHaveAttribute('aria-controls', 'picker-listbox');
    expect(getOptions()).toHaveAttribute('aria-multiselectable', 'true');
    expect(screen.getByTestId('ippon-combobox.option.1')).not.toHaveClass('-single');
  });

  it('should add an option to the selection and keep the panel open', () => {
    const onSelectionChange = vi.fn();

    render(<MultiCombobox selection={[options[0]]} onSelectionChange={onSelectionChange} />);

    openCombobox();
    fireEvent.click(screen.getByTestId('ippon-combobox.option.2'));

    expect(onSelectionChange).toHaveBeenCalledWith([options[0], options[1]]);
    expect(getInput()).toHaveAttribute('aria-expanded', 'true');
  });

  it('should take an already selected option out of the selection', () => {
    const onSelectionChange = vi.fn();

    render(
      <MultiCombobox selection={[options[0], options[1]]} onSelectionChange={onSelectionChange} />,
    );

    fireEvent.keyDown(getInput(), { key: 'ArrowDown' });
    fireEvent.keyDown(getInput(), { key: 'Enter' });

    expect(onSelectionChange).toHaveBeenCalledWith([options[1]]);
  });

  it('should count the selection and state it in words', () => {
    render(<MultiCombobox selection={[options[0], options[1]]} />);

    expect(screen.getByTestId('ippon-combobox.counter')).toHaveTextContent('2');
    expect(document.getElementById('picker-selection')).toHaveTextContent('2 options selected');
    expect(getInput().getAttribute('aria-describedby')).toContain('picker-selection');
  });

  it('should take the wording the caller hands over, having none of its own', () => {
    render(
      <MultiCombobox
        selection={[options[0]]}
        labels={{ selection: (count) => `${count} picked`, clear: 'Empty the selection' }}
      />,
    );

    expect(document.getElementById('picker-selection')).toHaveTextContent('1 picked');
    expect(screen.getByRole('button', { name: 'Empty the selection' })).toBeInTheDocument();
  });

  it('should render no counter without a selection', () => {
    render(<MultiCombobox />);

    expect(screen.queryByTestId('ippon-combobox.counter')).toBeNull();
  });

  it('should keep the selection region mounted and empty so a later count is announced', () => {
    render(<MultiCombobox />);

    const selection = document.getElementById('picker-selection');

    expect(selection).toHaveAttribute('role', 'status');
    expect(selection).toBeEmptyDOMElement();
    expect(getInput().getAttribute('aria-describedby')).toContain('picker-selection');
  });

  it('should clear the selection', () => {
    const onSelectionChange = vi.fn();

    render(<MultiCombobox selection={[options[0]]} onSelectionChange={onSelectionChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Clear selection' }));

    expect(onSelectionChange).toHaveBeenCalledWith([]);
  });

  it('should join the selected labels while closed', () => {
    render(<MultiCombobox selection={[options[0], options[1]]} />);

    expect(getInput()).toHaveValue('Option 1, Option 2');
  });

  it('should open no panel for slots the caller renders as nothing', () => {
    render(<MultiCombobox options={[]} message={null} footer={false} />);

    openCombobox();

    expect(getInput()).toHaveAttribute('aria-expanded', 'false');
  });
});
