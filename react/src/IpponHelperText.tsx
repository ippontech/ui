import { clsx } from 'clsx';
import type { DataSelectableWithChildren } from './DataSelectable.ts';
import { optionalToAlternativeClass } from './CAP.ts';

type IpponHelperTextProps = DataSelectableWithChildren<{
  id?: string;
  variant?: 'error' | 'success';
  className?: string;
}>;

export const IpponHelperText = (props: IpponHelperTextProps) => (
  <span
    className={clsx(
      'ippon-helper-text',
      optionalToAlternativeClass(props.variant),
      props.className,
    )}
    id={props.id}
    data-selector={props.dataSelector}
  >
    {props.children}
  </span>
);
