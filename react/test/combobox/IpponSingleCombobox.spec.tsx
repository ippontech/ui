import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen, configure, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import type { ReactNode } from 'react';
import type { IpponComboboxOption } from '../../src';
import { IpponSingleCombobox } from '../../src';

configure({
  testIdAttribute: 'data-selector',
});

const options: IpponComboboxOption[] = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2' },
  { key: '3', label: 'Option 3' },
];

const disabling = (key: string): IpponComboboxOption[] =>
  options.map((option) => ({ ...option, disabled: option.key === key }));

const noop = () => undefined;

const never = () => new Promise<void>(() => undefined);

type ComboboxOverrides = {
  query?: string;
  options?: IpponComboboxOption[];
  selection?: IpponComboboxOption;
  disabled?: boolean;
  readOnly?: boolean;
  message?: ReactNode;
  footer?: ReactNode;
  placeholderRows?: number;
  onQueryChange?: (query: string) => void | Promise<void>;
  onSelect?: (option: IpponComboboxOption) => void;
};

const Combobox = (props: ComboboxOverrides) => (
  <IpponSingleCombobox
    dataSelector="ippon-combobox"
    id="picker"
    query={props.query ?? ''}
    onQueryChange={props.onQueryChange ?? noop}
    options={props.options ?? options}
    selection={props.selection}
    onSelect={props.onSelect ?? noop}
    disabled={props.disabled}
    readOnly={props.readOnly}
    message={props.message}
    footer={props.footer}
    placeholderRows={props.placeholderRows}
  />
);

const getInput = () => screen.getByRole('combobox');

const getListbox = () => screen.getByTestId('ippon-combobox.option-list.options');

const openCombobox = () => fireEvent.focus(getInput());

describe('IpponSingleCombobox', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(<Combobox />);

    const input = getInput();

    expect(screen.getByTestId('ippon-combobox')).toHaveClass('ippon-combobox');
    expect(input).toHaveClass('ippon-input-search--input');
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
    expect(input).toHaveAttribute('aria-controls', 'picker-listbox');
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(getListbox()).toHaveAttribute('id', 'picker-listbox');
    expect(screen.getByTestId('ippon-combobox.list')).toHaveClass(
      'ippon-dropdown',
      'ippon-dropdown---options',
    );
  });

  it('should derive an id per option', () => {
    render(<Combobox />);

    expect(screen.getByTestId('ippon-combobox.option.2')).toHaveAttribute('id', 'picker-option-2');
  });

  it('should draw a bare glyph, no counter and no multiselection', () => {
    render(<Combobox selection={options[0]} />);

    expect(screen.getByTestId('ippon-combobox.option.1')).toHaveClass('-single', '-selected');
    expect(getListbox()).not.toHaveAttribute('aria-multiselectable');
    expect(screen.queryByTestId('ippon-combobox.counter')).toBeNull();
  });

  it('should open on focus', () => {
    render(<Combobox />);

    openCombobox();

    expect(getInput()).toHaveAttribute('aria-expanded', 'true');
  });

  it('should open the panel on typing', () => {
    const onQueryChange = vi.fn();

    render(<Combobox onQueryChange={onQueryChange} />);

    fireEvent.change(getInput(), { target: { value: 'Opt' } });

    expect(onQueryChange).toHaveBeenCalledWith('Opt');
    expect(getInput()).toHaveAttribute('aria-expanded', 'true');
  });

  it('should open and move down with the arrow keys', () => {
    render(<Combobox />);

    fireEvent.keyDown(getInput(), { key: 'ArrowDown' });

    expect(getInput()).toHaveAttribute('aria-expanded', 'true');
    expect(getInput()).toHaveAttribute('aria-activedescendant', 'picker-option-1');

    fireEvent.keyDown(getInput(), { key: 'ArrowDown' });

    expect(getInput()).toHaveAttribute('aria-activedescendant', 'picker-option-2');
  });

  it('should start from the last option when moving up from a closed panel', () => {
    render(<Combobox />);

    fireEvent.keyDown(getInput(), { key: 'ArrowUp' });

    expect(getInput()).toHaveAttribute('aria-activedescendant', 'picker-option-3');
  });

  it('should wrap around', () => {
    render(<Combobox />);

    fireEvent.keyDown(getInput(), { key: 'ArrowUp' });
    fireEvent.keyDown(getInput(), { key: 'ArrowDown' });

    expect(getInput()).toHaveAttribute('aria-activedescendant', 'picker-option-1');
  });

  it('should leave Home and End to the text cursor, as the combobox pattern asks', () => {
    render(<Combobox query="Option" />);

    openCombobox();
    fireEvent.keyDown(getInput(), { key: 'ArrowDown' });
    const homeNotPrevented = fireEvent.keyDown(getInput(), { key: 'Home' });
    const endNotPrevented = fireEvent.keyDown(getInput(), { key: 'End' });

    expect(homeNotPrevented).toBe(true);
    expect(endNotPrevented).toBe(true);
    expect(getInput()).toHaveAttribute('aria-activedescendant', 'picker-option-1');
  });

  it('should skip disabled options', () => {
    render(<Combobox options={disabling('2')} />);

    fireEvent.keyDown(getInput(), { key: 'ArrowDown' });
    fireEvent.keyDown(getInput(), { key: 'ArrowDown' });

    expect(getInput()).toHaveAttribute('aria-activedescendant', 'picker-option-3');
    expect(screen.getByTestId('ippon-combobox.option.2')).toHaveAttribute('aria-disabled', 'true');
  });

  it('should select the active option on Enter and close', () => {
    const onSelect = vi.fn();

    render(<Combobox onSelect={onSelect} />);

    fireEvent.keyDown(getInput(), { key: 'ArrowDown' });
    fireEvent.keyDown(getInput(), { key: 'Enter' });

    expect(onSelect).toHaveBeenCalledWith(options[0]);
    expect(getInput()).toHaveAttribute('aria-expanded', 'false');
  });

  it('should select an option on click without taking focus from the input', () => {
    const onSelect = vi.fn();

    render(<Combobox onSelect={onSelect} />);

    openCombobox();
    const option = screen.getByTestId('ippon-combobox.option.2');
    const mouseDownNotPrevented = fireEvent.mouseDown(option);
    fireEvent.click(option);

    expect(onSelect).toHaveBeenCalledWith(options[1]);
    expect(mouseDownNotPrevented).toBe(false);
    expect(getInput()).toHaveAttribute('aria-expanded', 'false');
  });

  it('should make an option active on pointer enter', () => {
    render(<Combobox />);

    openCombobox();
    fireEvent.pointerEnter(screen.getByTestId('ippon-combobox.option.3'));

    expect(getInput()).toHaveAttribute('aria-activedescendant', 'picker-option-3');
  });

  it('should ignore a disabled option', () => {
    const onSelect = vi.fn();

    render(<Combobox options={disabling('1')} onSelect={onSelect} />);

    openCombobox();
    fireEvent.click(screen.getByTestId('ippon-combobox.option.1'));

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('should close on Escape without letting the key act on anything under it', () => {
    render(<Combobox />);

    openCombobox();
    const notPrevented = fireEvent.keyDown(getInput(), { key: 'Escape' });

    expect(getInput()).toHaveAttribute('aria-expanded', 'false');
    expect(notPrevented).toBe(false);
  });

  it('should close on Escape even once nothing inside the panel holds focus', () => {
    render(<Combobox footer={<button type="button">Load more</button>} />);

    openCombobox();
    const notPrevented = fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(getInput()).toHaveAttribute('aria-expanded', 'false');
    expect(notPrevented).toBe(false);
  });

  it('should let Escape through once the panel is closed', () => {
    render(<Combobox />);

    const notPrevented = fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(notPrevented).toBe(true);
  });

  it('should close when focus leaves the combobox', () => {
    render(
      <>
        <Combobox />
        <button type="button">Outside</button>
      </>,
    );

    openCombobox();
    fireEvent.focusOut(getInput(), {
      relatedTarget: screen.getByRole('button', { name: 'Outside' }),
    });

    expect(getInput()).toHaveAttribute('aria-expanded', 'false');
  });

  it('should close when focus leaves without naming a destination', () => {
    render(<Combobox />);

    openCombobox();
    fireEvent.focusOut(getInput(), { relatedTarget: null });

    expect(getInput()).toHaveAttribute('aria-expanded', 'false');
  });

  it('should stay open when focus moves to the footer', () => {
    render(<Combobox footer={<button type="button">Load more</button>} />);

    openCombobox();
    fireEvent.focusOut(getInput(), {
      relatedTarget: screen
        .getByTestId('ippon-combobox.option-list.footer')
        .querySelector('button'),
    });

    expect(getInput()).toHaveAttribute('aria-expanded', 'true');
  });

  it('should open again on a pointer landing on the field it already focuses', () => {
    render(<Combobox />);

    openCombobox();
    fireEvent.click(screen.getByTestId('ippon-combobox.option.2'));

    expect(getInput()).toHaveAttribute('aria-expanded', 'false');

    fireEvent.pointerDown(getInput());

    expect(getInput()).toHaveAttribute('aria-expanded', 'true');
  });

  it('should open on a pointer landing on the chevron', () => {
    render(<Combobox />);

    const chevron = screen.getByTestId('ippon-combobox').querySelector('.ippon-combobox--chevron');
    fireEvent.pointerDown(chevron as Element);

    expect(getInput()).toHaveAttribute('aria-expanded', 'true');
  });

  it('should not reopen when a pointer lands on an option', () => {
    render(<Combobox />);

    openCombobox();
    const option = screen.getByTestId('ippon-combobox.option.2');
    fireEvent.pointerDown(option);
    fireEvent.click(option);

    expect(getInput()).toHaveAttribute('aria-expanded', 'false');
  });

  it('should close when a pointer lands outside the combobox', () => {
    render(<Combobox />);

    openCombobox();
    fireEvent.pointerDown(document.body);

    expect(getInput()).toHaveAttribute('aria-expanded', 'false');
  });

  it('should stay open when a pointer lands inside the combobox', () => {
    render(<Combobox />);

    openCombobox();
    fireEvent.pointerDown(screen.getByTestId('ippon-combobox.option.1'));

    expect(getInput()).toHaveAttribute('aria-expanded', 'true');
  });

  it('should show the selected label while closed', () => {
    render(<Combobox selection={options[0]} />);

    expect(getInput()).toHaveValue('Option 1');
  });

  it('should keep showing the selection while closed whatever is left in the query', () => {
    render(<Combobox query="Opt" selection={options[0]} />);

    expect(getInput()).toHaveValue('Option 1');
  });

  it('should show the query instead of the label once open', () => {
    render(<Combobox query="Opt" selection={options[0]} />);

    openCombobox();

    expect(getInput()).toHaveValue('Opt');
  });

  it('should show an unfinished query while closed without a selection', () => {
    render(<Combobox query="Opt" />);

    expect(getInput()).toHaveValue('Opt');
  });

  it('should not open when disabled', () => {
    render(<Combobox disabled />);

    openCombobox();
    fireEvent.keyDown(getInput(), { key: 'ArrowDown' });

    expect(getInput()).toHaveAttribute('aria-expanded', 'false');
  });

  it('should not open when read only', () => {
    render(<Combobox readOnly />);

    openCombobox();

    expect(getInput()).toHaveAttribute('aria-expanded', 'false');
  });

  it('should open no panel when it would hold nothing at all', () => {
    render(<Combobox options={[]} />);

    openCombobox();

    expect(getInput()).toHaveAttribute('aria-expanded', 'false');
  });

  it('should open a panel holding no option but something to say', () => {
    render(<Combobox options={[]} message="No option matches your search" />);

    openCombobox();

    expect(getInput()).toHaveAttribute('aria-expanded', 'true');
  });

  it('should render the message the caller hands over', () => {
    render(<Combobox options={[]} message="No option matches your search" />);

    expect(screen.getByTestId('ippon-combobox.option-list.message')).toHaveTextContent(
      'No option matches your search',
    );
  });

  it('should keep the options while a search the caller handed back is in flight', () => {
    render(<Combobox onQueryChange={never} />);

    fireEvent.change(getInput(), { target: { value: 'Opt' } });

    expect(getListbox()).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByTestId('ippon-combobox.option.1')).toBeInTheDocument();
  });

  it('should hand the placeholder rows over to the list, so a first load holds the shape', () => {
    render(<Combobox options={[]} placeholderRows={4} />);

    const rows = [...getListbox().children];

    expect(rows).toHaveLength(4);
    expect(rows[0]).toHaveClass('ippon-option', '-placeholder');
    expect(screen.queryAllByRole('option')).toHaveLength(0);
  });

  it('should never be busy for a caller that searches synchronously', () => {
    render(<Combobox />);

    fireEvent.change(getInput(), { target: { value: 'Opt' } });

    expect(getListbox()).not.toHaveAttribute('aria-busy');
  });

  it('should stop being busy once the search settles', async () => {
    let settle = noop;
    const onQueryChange = () => new Promise<void>((resolve) => (settle = resolve));

    render(<Combobox onQueryChange={onQueryChange} />);

    fireEvent.change(getInput(), { target: { value: 'Opt' } });

    expect(getListbox()).toHaveAttribute('aria-busy', 'true');

    await act(async () => settle());

    expect(getListbox()).not.toHaveAttribute('aria-busy');
  });

  it('should ignore a search that settles after a newer one started', async () => {
    let settleFirst = noop;
    const onQueryChange = vi
      .fn()
      .mockImplementationOnce(() => new Promise<void>((resolve) => (settleFirst = resolve)))
      .mockImplementationOnce(never);

    render(<Combobox onQueryChange={onQueryChange} />);

    fireEvent.change(getInput(), { target: { value: 'O' } });
    fireEvent.change(getInput(), { target: { value: 'Op' } });

    await act(async () => settleFirst());

    expect(getListbox()).toHaveAttribute('aria-busy', 'true');
  });

  it('should open the panel by itself when the options arrive later', () => {
    const { rerender } = render(<Combobox options={[]} />);

    openCombobox();

    expect(getInput()).toHaveAttribute('aria-expanded', 'false');

    rerender(<Combobox options={options} />);

    expect(getInput()).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('ippon-combobox.option.1')).toBeInTheDocument();
  });

  it('should drop the active option when the new results no longer hold it', () => {
    const onSelect = vi.fn();

    const { rerender } = render(<Combobox onSelect={onSelect} />);

    fireEvent.keyDown(getInput(), { key: 'ArrowDown' });

    expect(getInput()).toHaveAttribute('aria-activedescendant', 'picker-option-1');

    rerender(<Combobox options={[options[2]]} onSelect={onSelect} />);

    expect(getInput()).not.toHaveAttribute('aria-activedescendant');

    fireEvent.keyDown(getInput(), { key: 'Enter' });

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('should activate the first of the new results on the next arrow key', () => {
    const { rerender } = render(<Combobox />);

    fireEvent.keyDown(getInput(), { key: 'ArrowDown' });
    rerender(<Combobox options={[options[2]]} />);
    fireEvent.keyDown(getInput(), { key: 'ArrowDown' });

    expect(getInput()).toHaveAttribute('aria-activedescendant', 'picker-option-3');
  });

  it('should keep showing the selected label once the item leaves the results', () => {
    const { rerender } = render(<Combobox selection={options[0]} />);

    expect(getInput()).toHaveValue('Option 1');

    rerender(<Combobox selection={options[0]} options={[options[2]]} />);

    expect(getInput()).toHaveValue('Option 1');
  });

  it('should render a footer inside the scrolling area and outside the listbox', () => {
    render(<Combobox footer={<button type="button">Load more</button>} />);

    const footer = screen.getByTestId('ippon-combobox.option-list.footer');

    expect(footer).toHaveTextContent('Load more');
    expect(footer.closest('.ippon-option-list--scroll')).not.toBeNull();
    expect(footer.closest('[role="listbox"]')).toBeNull();
  });
});
