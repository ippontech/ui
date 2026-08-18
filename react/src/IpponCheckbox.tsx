import { clsx } from 'clsx';
import type { ComponentProps, ReactNode } from 'react';
import type { DataSelectable } from './DataSelectable.ts';
import { toChildSelector } from './DataSelectable.ts';
import { IpponIon } from './IpponIon.tsx';
import { optionalToAlternativeClass } from './CAP.ts';

type IpponCheckboxVanillaProps = {
  variant?: 'error';
  children?: ReactNode;
};

type IpponCheckboxProps = DataSelectable<ComponentProps<'input'> & IpponCheckboxVanillaProps>;

const toInputSelector = toChildSelector('input');

export const IpponCheckbox = ({
  variant,
  children,
  dataSelector,
  className,
  id,
  ...inputProps
}: IpponCheckboxProps) => (
  <label
    className={clsx('ippon-checkbox', optionalToAlternativeClass(variant), className)}
    htmlFor={id}
    data-selector={dataSelector}
  >
    <input
      aria-invalid={variant === 'error' || undefined}
      {...inputProps}
      id={id}
      type="checkbox"
      className="ippon-checkbox--input"
      data-selector={toInputSelector(dataSelector)}
    />
    <span className="ippon-checkbox--box">
      <IpponIon name="checkmark" className="ippon-checkbox--glyph" />
    </span>
    {children}
  </label>
);
