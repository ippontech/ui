import { clsx } from 'clsx';
import type { KeyboardEventHandler, ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Optional } from '../Optional.ts';
import type { DataSelectable } from '../DataSelectable.ts';
import { toChildSelector } from '../DataSelectable.ts';
import { toSlot } from '../Slot.ts';
import { toActiveOption, toMovedKey } from './ComboboxActiveOption.ts';
import { dismissOn, scrollActiveOptionIntoView, syncPopover } from './ComboboxDom.ts';
import { toComboboxFieldHandlers } from './ComboboxField.ts';
import type { IpponComboboxOption } from './ComboboxOption.ts';
import { toDisplayValue, toOptionId, toSelectedKeys } from './ComboboxOption.ts';
import type { ComboboxQueryResult } from './ComboboxQuery.ts';
import { toPendingQuery } from './ComboboxQuery.ts';
import { IpponDropdown } from '../IpponDropdown.tsx';
import { IpponInputSearch } from '../IpponInputSearch.tsx';
import { IpponIon } from '../IpponIon.tsx';
import { IpponOption } from '../IpponOption.tsx';
import { IpponOptionList } from '../IpponOptionList.tsx';

type IpponSingleComboboxProps<Option extends IpponComboboxOption> = DataSelectable<{
  id: string;
  options: readonly Option[];
  query: string;
  onQueryChange: (query: string) => ComboboxQueryResult;
  selection?: Option;
  onSelect: (option: Option) => void;
  message?: ReactNode;
  footer?: ReactNode;
  placeholderRows?: number;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  variant?: 'error' | 'success';
  labelledBy?: string;
  describedBy?: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  className?: string;
}>;

const toControlSelector = toChildSelector('control');

const toListSelector = toChildSelector('list');

const toOptionListSelector = toChildSelector('option-list');

export const IpponSingleCombobox = <Option extends IpponComboboxOption>(
  props: IpponSingleComboboxProps<Option>,
) => {
  const interactive = !props.disabled && !props.readOnly;

  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string | undefined>(undefined);
  const [busy, setBusy] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef(0);

  const hasContent =
    props.options.length > 0 ||
    (props.placeholderRows ?? 0) > 0 ||
    toSlot(props.message).isPresent() ||
    toSlot(props.footer).isPresent();

  const expanded = open && interactive && hasContent;

  const collapse = useCallback(() => setOpen(false), []);

  const expand = () => {
    if (interactive) {
      setOpen(true);
    }
  };

  useEffect(() => syncPopover(wrapperRef.current, expanded), [expanded]);

  useEffect(
    () => (expanded ? dismissOn(wrapperRef.current, collapse) : undefined),
    [expanded, collapse],
  );

  useEffect(() => {
    if (expanded && activeKey !== undefined) {
      scrollActiveOptionIntoView(wrapperRef.current);
    }
  }, [expanded, activeKey]);

  const active = {
    activeKey,
    activeOption: toActiveOption(props.options, activeKey),
    activate: setActiveKey,
    move: (delta: number) =>
      setActiveKey(toMovedKey(props.options, activeKey, delta).orUndefined()),
  };

  const onQueryChange = (query: string) => {
    const ticket = pendingRef.current + 1;
    pendingRef.current = ticket;
    const pending = toPendingQuery(props.onQueryChange(query));
    pending.ifAbsent(() => setBusy(false));
    pending.ifPresent((promise) => {
      setBusy(true);
      void promise.finally(() => {
        if (pendingRef.current === ticket) {
          setBusy(false);
        }
      });
    });
  };

  const selection = Optional.ofUndefinable(props.selection)
    .map((option) => [option])
    .orElse([]);
  const selectedKeys = toSelectedKeys(selection);

  const listboxId = `${props.id}-listbox`;

  const pick = (option: Option) => {
    props.onSelect(option);
    collapse();
  };

  const field = toComboboxFieldHandlers({
    interactive,
    expanded,
    expand,
    collapse,
    active,
    onQueryChange,
    onPick: pick,
    onKeyDown: props.onKeyDown,
  });

  const displayValue = toDisplayValue(props.query, selection, expanded);

  return (
    <div
      ref={wrapperRef}
      className={clsx('ippon-combobox', props.className)}
      data-selector={props.dataSelector}
      onBlur={field.onBlur}
      onPointerDown={field.onPointerDown}
    >
      <IpponInputSearch
        id={props.id}
        className="ippon-combobox--control"
        role="combobox"
        aria-expanded={expanded}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={
          expanded
            ? active.activeOption.map((option) => toOptionId(props.id, option.key)).orUndefined()
            : undefined
        }
        aria-labelledby={props.labelledBy}
        aria-describedby={props.describedBy}
        variant={props.variant}
        disabled={props.disabled}
        readOnly={props.readOnly}
        placeholder={props.placeholder}
        value={displayValue}
        suffix={<IpponIon name="caret-down" className="ippon-combobox--chevron" />}
        dataSelector={toControlSelector(props.dataSelector)}
        onChange={field.onChange}
        onFocus={expand}
        onKeyDown={field.onKeyDown}
      />
      <IpponDropdown
        id={`${props.id}-list`}
        ion="options"
        popover="manual"
        className="ippon-combobox--list"
        dataSelector={toListSelector(props.dataSelector)}
      >
        <IpponOptionList
          id={listboxId}
          busy={busy}
          placeholderRows={props.placeholderRows}
          labelledBy={props.labelledBy}
          message={props.message}
          footer={props.footer}
          dataSelector={toOptionListSelector(props.dataSelector)}
        >
          {props.options.map((option) => (
            <IpponOption
              key={option.key}
              id={toOptionId(props.id, option.key)}
              label={option.label}
              description={option.description}
              selected={selectedKeys.has(option.key)}
              active={option.key === active.activeKey}
              disabled={option.disabled}
              single
              dataSelector={toChildSelector(`option.${option.key}`)(props.dataSelector)}
              onPointerEnter={() => active.activate(option.key)}
              onClick={() => pick(option)}
            />
          ))}
        </IpponOptionList>
      </IpponDropdown>
    </div>
  );
};
