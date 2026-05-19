import type { DataSelectableWithChildren } from './DataSelectable.ts';
import {
  optionalToAlternativeClass,
  optionalToPrefixedAlternativeClass,
  toAlternativeClass,
} from './CAP.ts';
import { clsx } from 'clsx';
import type { IpponCardShadowLevel, IpponCardSize } from './Card.ts';

export type IpponButtonCardProps = DataSelectableWithChildren<{
  onClick?: () => void;
  shadow?: IpponCardShadowLevel;
  border?: boolean;
  size?: IpponCardSize;
  fullWidth?: boolean;
}>;

export const IpponButtonCard = (props: IpponButtonCardProps) => (
  <button
    className={clsx(
      'ippon-button-card',
      optionalToPrefixedAlternativeClass('shadow')(props.shadow),
      {
        [toAlternativeClass('border')]: props.border,
        [toAlternativeClass('full-width')]: props.fullWidth,
      },
      optionalToAlternativeClass(props.size),
    )}
    onClick={props.onClick}
    data-selector={props.dataSelector}
  >
    {props.children}
  </button>
);
