import type {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent as ReactKeyboardEvent,
  KeyboardEventHandler,
  PointerEvent as ReactPointerEvent,
} from 'react';
import type { ComboboxActiveOption } from './ComboboxActiveOption.ts';
import type { IpponComboboxOption } from './ComboboxOption.ts';

type ComboboxFieldInput<Option extends IpponComboboxOption> = {
  interactive: boolean;
  expanded: boolean;
  expand: () => void;
  collapse: () => void;
  active: ComboboxActiveOption<Option>;
  onQueryChange: (query: string) => void;
  onPick: (option: Option) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
};

export type ComboboxFieldHandlers = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: ReactKeyboardEvent<HTMLInputElement>) => void;
  onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onBlur: (event: FocusEvent<HTMLDivElement>) => void;
};

const leftTheDocument = (event: FocusEvent<HTMLDivElement>): boolean =>
  event.relatedTarget === null && !(event.target as Element).isConnected;

export const toComboboxFieldHandlers = <Option extends IpponComboboxOption>({
  interactive,
  expanded,
  expand,
  collapse,
  active,
  onQueryChange,
  onPick,
  onKeyDown,
}: ComboboxFieldInput<Option>): ComboboxFieldHandlers => {
  const handleListKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      active.activeOption.ifPresent((option) => {
        event.preventDefault();
        onPick(option);
      });
    }
  };

  return {
    onChange: (event) => {
      expand();
      onQueryChange(event.target.value);
    },
    onKeyDown: (event) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || !interactive) {
        return;
      }
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        expand();
        active.move(event.key === 'ArrowDown' ? 1 : -1);
        return;
      }
      if (expanded) {
        handleListKeyDown(event);
      }
    },
    onPointerDown: (event) => {
      if (expanded || (event.target as Element).closest('.ippon-combobox--control') === null) {
        return;
      }
      expand();
    },
    onBlur: (event) => {
      if (event.currentTarget.contains(event.relatedTarget) || leftTheDocument(event)) {
        return;
      }
      collapse();
    },
  };
};
