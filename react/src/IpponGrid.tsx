import type { ReactNode } from 'react';
import type { DataSelectableWithChildren } from './DataSelectable.ts';
import type { IpponGridCol, IpponGridContainer, IpponGridGap, IpponGridMedia } from './Grid.ts';
import { clsx } from 'clsx';
import { toAlternativeClass } from './CAP.ts';
import { Optional } from './Optional.ts';

const toResponsiveClasses = (
  prefix: string,
  value: string | number | (string | number)[],
): string =>
  clsx(
    Array.isArray(value)
      ? value.map((v) => toAlternativeClass(`${prefix}-${v}`))
      : toAlternativeClass(`${prefix}-${value}`),
  );

const optionalToResponsiveClasses =
  (prefix: string) =>
  (value?: string | number | (string | number)[]): string | undefined =>
    Optional.ofFalsifiable(value)
      .map((v) => toResponsiveClasses(prefix, v))
      .orUndefined();

type IpponGridProps = DataSelectableWithChildren<{
  media?: IpponGridMedia;
  container?: IpponGridContainer;
  gap?: IpponGridGap;
}>;

export const IpponGrid = (props: IpponGridProps): ReactNode => (
  <div
    className={clsx(
      'ippon-grid',
      optionalToResponsiveClasses('media')(props.media),
      optionalToResponsiveClasses('container')(props.container),
      optionalToResponsiveClasses('gap')(props.gap),
    )}
    data-selector={props.dataSelector}
  >
    {props.children}
  </div>
);

type IpponGridSlotProps = DataSelectableWithChildren<{
  col?: IpponGridCol;
}>;

export const IpponGridSlot = (props: IpponGridSlotProps): ReactNode => (
  <div
    className={clsx('ippon-grid--slot', optionalToResponsiveClasses('col')(props.col))}
    data-selector={props.dataSelector}
  >
    {props.children}
  </div>
);
