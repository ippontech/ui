import { clsx } from 'clsx';
import type { KeyboardEventHandler, ToggleEventHandler } from 'react';
import type { DataSelectableWithChildren } from './DataSelectable.ts';

type IpponDropdownProps = DataSelectableWithChildren<{
  id: string;
  className?: string;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  onToggle?: ToggleEventHandler<HTMLDivElement>;
}>;

export const IpponDropdown = (props: IpponDropdownProps) => (
  <div
    id={props.id}
    popover="auto"
    className={clsx('ippon-dropdown', 'ippon-dropdown---buttons', props.className)}
    data-selector={props.dataSelector}
    onKeyDown={props.onKeyDown}
    onToggle={props.onToggle}
  >
    {props.children}
  </div>
);
