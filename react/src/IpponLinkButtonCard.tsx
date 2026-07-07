import type { DataSelectableWithChildren } from './DataSelectable.ts';
import {
  optionalToAlternativeClass,
  optionalToPrefixedAlternativeClass,
  toAlternativeClass,
} from './CAP.ts';
import { clsx } from 'clsx';
import type { IpponCardColor, IpponCardShadowLevel, IpponCardSize } from './Card.ts';

export type IpponLinkButtonCardProps = DataSelectableWithChildren<{
  href: string;
  shadow?: IpponCardShadowLevel;
  border?: boolean;
  size?: IpponCardSize;
  color?: IpponCardColor;
  fullWidth?: boolean;
}>;

export const IpponLinkButtonCard = (props: IpponLinkButtonCardProps) => (
  <a
    className={clsx(
      'ippon-button-card',
      optionalToPrefixedAlternativeClass('shadow')(props.shadow),
      {
        [toAlternativeClass('border')]: props.border,
        [toAlternativeClass('full-width')]: props.fullWidth,
      },
      optionalToAlternativeClass(props.size),
      optionalToAlternativeClass(props.color),
    )}
    href={props.href}
    data-selector={props.dataSelector}
  >
    {props.children}
  </a>
);
