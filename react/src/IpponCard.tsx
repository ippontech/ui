import type { DataSelectableWithChildren } from './DataSelectable.ts';
import { clsx } from 'clsx';
import {
  optionalToPrefixedAlternativeClass,
  optionalToAlternativeClass,
  toAlternativeClass,
} from './CAP.ts';
import type { IpponCardShadowLevel, IpponCardSize, IpponCardColor } from './Card.ts';

type IpponCardProps = DataSelectableWithChildren<{
  shadow?: IpponCardShadowLevel;
  border?: boolean;
  size?: IpponCardSize;
  color?: IpponCardColor;
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
      optionalToAlternativeClass(props.color),
    )}
    data-selector={props.dataSelector}
  >
    {props.children}
  </div>
);
