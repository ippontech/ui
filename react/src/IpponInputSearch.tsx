import { clsx } from 'clsx';
import type { ComponentProps, ReactNode } from 'react';
import type { DataSelectable } from './DataSelectable.ts';
import { toChildSelector } from './DataSelectable.ts';
import type { IpponIonProps } from './IpponIon.tsx';
import { IpponIon } from './IpponIon.tsx';
import { optionalToAlternativeClass } from './CAP.ts';

type IpponInputSearchVanillaProps = {
  variant?: 'error' | 'success';
  icon?: IpponIonProps;
  suffix?: ReactNode;
};

type IpponInputSearchProps = DataSelectable<ComponentProps<'input'> & IpponInputSearchVanillaProps>;

const toInputSelector = toChildSelector('input');

export const IpponInputSearch = ({
  variant,
  icon,
  suffix,
  dataSelector,
  className,
  type,
  ...inputProps
}: IpponInputSearchProps) => (
  <div
    className={clsx('ippon-input-search', optionalToAlternativeClass(variant), className)}
    data-selector={dataSelector}
  >
    <IpponIon {...(icon ?? { name: 'search' })} className="ippon-input-search--icon" />
    <input
      aria-invalid={variant === 'error' || undefined}
      {...inputProps}
      type={type ?? 'text'}
      className="ippon-input-search--input"
      data-selector={toInputSelector(dataSelector)}
    />
    {suffix === undefined ? null : <span className="ippon-input-search--suffix">{suffix}</span>}
  </div>
);
