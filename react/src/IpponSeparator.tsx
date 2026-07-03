import { clsx } from 'clsx';
import type { DataSelectable } from './DataSelectable.ts';

type IpponSeparatorProps = DataSelectable<{
  className?: string;
}>;

export const IpponSeparator = (props: IpponSeparatorProps) => (
  <hr className={clsx('ippon-separator', props.className)} data-selector={props.dataSelector} />
);
