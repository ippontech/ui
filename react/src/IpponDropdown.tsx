import { clsx } from 'clsx';
import type { KeyboardEventHandler, ToggleEventHandler } from 'react';
import { toIonClass } from './CAP.ts';
import type { DataSelectableWithChildren } from './DataSelectable.ts';

type IpponDropdownProps = DataSelectableWithChildren<{
  id: string;
  ion?: 'buttons' | 'options';
  popover?: 'auto' | 'manual';
  className?: string;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  onToggle?: ToggleEventHandler<HTMLDivElement>;
}>;

export const IpponDropdown = (props: IpponDropdownProps) => (
  <div
    id={props.id}
    popover={props.popover ?? 'auto'}
    className={clsx(
      'ippon-dropdown',
      toIonClass('ippon-dropdown', props.ion ?? 'buttons'),
      props.className,
    )}
    data-selector={props.dataSelector}
    onKeyDown={props.onKeyDown}
    onToggle={props.onToggle}
  >
    {props.children}
  </div>
);
