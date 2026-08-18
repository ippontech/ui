import { clsx } from 'clsx';
import type { DataSelectableWithChildren } from './DataSelectable.ts';

type IpponLabelProps = DataSelectableWithChildren<{
  id?: string;
  htmlFor?: string;
  className?: string;
}>;

export const IpponLabel = (props: IpponLabelProps) => (
  <label
    id={props.id}
    className={clsx('ippon-label', props.className)}
    htmlFor={props.htmlFor}
    data-selector={props.dataSelector}
  >
    {props.children}
  </label>
);
