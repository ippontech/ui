import { clsx } from 'clsx';
import type { DataSelectableWithChildren } from './DataSelectable.ts';
import { optionalToAlternativeClass } from './CAP.ts';
import type { IpponIconSurfaceColor } from './IconSurface.ts';

type IpponIconSurfaceProps = DataSelectableWithChildren<{
  color?: IpponIconSurfaceColor;
}>;

export const IpponIconSurface = (props: IpponIconSurfaceProps) => (
  <div
    className={clsx('ippon-icon-surface', optionalToAlternativeClass(props.color))}
    data-selector={props.dataSelector}
  >
    {props.children}
  </div>
);
