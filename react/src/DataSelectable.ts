import type { PropsWithChildren } from 'react';

export type DataSelectable<T = unknown> = T & {
  dataSelector?: string;
};

export type DataSelectableWithChildren<T = unknown> = DataSelectable<PropsWithChildren<T>>;

export const toChildSelector =
  (child: string) =>
  (dataSelector?: string): string | undefined =>
    dataSelector ? `${dataSelector}.${child}` : undefined;
