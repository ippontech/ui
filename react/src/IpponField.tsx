import { clsx } from 'clsx';
import type { DataSelectableWithChildren } from './DataSelectable.ts';

type IpponFieldProps = DataSelectableWithChildren<{
  className?: string;
}>;

export const IpponField = (props: IpponFieldProps) => (
  <div className={clsx('ippon-field', props.className)} data-selector={props.dataSelector}>
    {props.children}
  </div>
);
