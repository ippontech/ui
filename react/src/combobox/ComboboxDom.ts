import { Optional } from '../Optional.ts';

const toPanel = (wrapper: HTMLElement | null): Optional<HTMLElement> =>
  Optional.ofNullable(wrapper).flatMap((element) =>
    Optional.ofNullable(element.querySelector<HTMLElement>('.ippon-combobox--list')),
  );

const toActiveRow = (wrapper: HTMLElement | null): Optional<Element> =>
  Optional.ofNullable(wrapper).flatMap((element) =>
    Optional.ofNullable(element.querySelector('.ippon-option.-active')),
  );

export const syncPopover = (wrapper: HTMLElement | null, expanded: boolean): void => {
  toPanel(wrapper).ifPresent((panel) => {
    if (!panel.showPopover) {
      return;
    }
    const opened = panel.matches(':popover-open');
    if (expanded && !opened) {
      panel.showPopover();
    }
    if (!expanded && opened) {
      panel.hidePopover();
    }
  });
};

export const dismissOn = (wrapper: HTMLElement | null, collapse: () => void): (() => void) => {
  const collapseOnOutsidePointer = (event: PointerEvent) => {
    Optional.ofNullable(wrapper)
      .filter((element) => !element.contains(event.target as Node))
      .ifPresent(collapse);
  };
  const collapseOnEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      collapse();
    }
  };
  document.addEventListener('pointerdown', collapseOnOutsidePointer);
  document.addEventListener('keydown', collapseOnEscape);
  return () => {
    document.removeEventListener('pointerdown', collapseOnOutsidePointer);
    document.removeEventListener('keydown', collapseOnEscape);
  };
};

export const scrollActiveOptionIntoView = (wrapper: HTMLElement | null): void => {
  toActiveRow(wrapper).ifPresent((row) => row.scrollIntoView?.({ block: 'nearest' }));
};
