import type { PropsWithChildren } from 'react';

export type DataSelectable<T = unknown> = T & {
  dataSelector?: string;
};

export type DataSelectableWithChildren<T = unknown> = DataSelectable<PropsWithChildren<T>>;
