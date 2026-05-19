import type { DataSelectableWithChildren } from './DataSelectable.ts';
import { clsx } from 'clsx';
import {
  optionalToPrefixedAlternativeClass,
  optionalToAlternativeClass,
  toAlternativeClass,
} from './CAP.ts';
import type { IpponCardShadowLevel, IpponCardSize } from './Card.ts';

type IpponCardProps = DataSelectableWithChildren<{
  shadow?: IpponCardShadowLevel;
  border?: boolean;
  size?: IpponCardSize;
}>;

export const IpponCard = (props: IpponCardProps) => (
  <div
    className={clsx(
      'ippon-card',
      optionalToPrefixedAlternativeClass('shadow')(props.shadow),
      {
        [toAlternativeClass('border')]: props.border,
      },
      optionalToAlternativeClass(props.size),
    )}
    data-selector={props.dataSelector}
  >
    {props.children}
  </div>
);
