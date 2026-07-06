import { clsx } from 'clsx';
import type { ComponentProps } from 'react';
import type { DataSelectable } from './DataSelectable.ts';
import { optionalToAlternativeClass } from './CAP.ts';

type IpponInputTextProps = DataSelectable<
  ComponentProps<'input'> & {
    variant?: 'error' | 'success';
  }
>;

export const IpponInputText = ({
  variant,
  dataSelector,
  className,
  type,
  ...inputProps
}: IpponInputTextProps) => (
  <input
    aria-invalid={variant === 'error' || undefined}
    {...inputProps}
    type={type ?? 'text'}
    className={clsx('ippon-input-text', optionalToAlternativeClass(variant), className)}
    data-selector={dataSelector}
  />
);
