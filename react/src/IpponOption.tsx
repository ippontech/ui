import { clsx } from 'clsx';
import type { MouseEventHandler, PointerEventHandler, ReactNode } from 'react';
import type { DataSelectableWithChildren } from './DataSelectable.ts';
import { IpponIon } from './IpponIon.tsx';
import { toAlternativeClass } from './CAP.ts';

type IpponOptionVanillaProps = {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  selected?: boolean;
  active?: boolean;
  disabled?: boolean;
  single?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLLIElement>;
  onPointerEnter?: PointerEventHandler<HTMLLIElement>;
};

type IpponOptionProps = DataSelectableWithChildren<IpponOptionVanillaProps>;

export const IpponOption = (props: IpponOptionProps) => (
  <li
    id={props.id}
    role="option"
    aria-selected={!!props.selected}
    aria-disabled={props.disabled || undefined}
    className={clsx('ippon-option', props.className, {
      [toAlternativeClass('selected')]: !!props.selected,
      [toAlternativeClass('active')]: !!props.active,
      [toAlternativeClass('disabled')]: !!props.disabled,
      [toAlternativeClass('single')]: !!props.single,
    })}
    data-selector={props.dataSelector}
    onClick={props.disabled ? undefined : props.onClick}
    onMouseDown={(event) => event.preventDefault()}
    onPointerEnter={props.disabled ? undefined : props.onPointerEnter}
  >
    <span className="ippon-option--check">
      <IpponIon name="checkmark" className="ippon-option--glyph" />
    </span>
    <span className="ippon-option--text">
      <span className="ippon-option--label">{props.label}</span>
      {props.description === undefined ? null : (
        <span className="ippon-option--description">{props.description}</span>
      )}
    </span>
    {props.children === undefined ? null : (
      <span className="ippon-option--suffix">{props.children}</span>
    )}
  </li>
);

export const IpponOptionPlaceholder = () => (
  <li className="ippon-option -placeholder" aria-hidden="true">
    <span className="ippon-option--check" />
    <span className="ippon-option--text">
      <span className="ippon-option--label" />
    </span>
  </li>
);
