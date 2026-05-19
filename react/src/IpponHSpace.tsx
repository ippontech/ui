import type { ReactNode, JSX } from 'react';
import type { IpponTokenSize } from './Tokens.ts';
import { clsx } from 'clsx';
import type { DataSelectableWithChildren } from './DataSelectable.ts';
import { Optional } from './Optional.ts';
import { optionalToPrefixedAlternativeClass, toAlternativeClass } from './CAP.ts';

type Align = 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom' | 'space-between';

type IpponHSpaceProps = DataSelectableWithChildren<{
  gap?: IpponTokenSize;
  align?: Align | Align[];
  className?: string;
  wrap?: boolean;
  tag?: keyof JSX.IntrinsicElements;
}>;

const alignSetToClass = (alignSet: Set<Align>): string =>
  clsx([...alignSet].map(toAlternativeClass));

const alignToClass = (align: Align | Align[]): string => {
  if (typeof align === 'string') {
    return toAlternativeClass(align);
  }
  return alignSetToClass(new Set<Align>(align));
};

export const IpponHSpace = (props: IpponHSpaceProps): ReactNode => {
  const CustomTag: keyof JSX.IntrinsicElements = props.tag || 'div';
  const className = clsx(
    'ippon-h-space',
    optionalToPrefixedAlternativeClass('gap')(props.gap),
    Optional.ofFalsifiable(props.align).map(alignToClass).orUndefined(),
    props.className,
    { '-wrap': props.wrap },
  );

  return (
    <CustomTag className={className} data-selector={props.dataSelector}>
      {props.children}
    </CustomTag>
  );
};

type IpponHSpaceSlotProps = DataSelectableWithChildren<{
  expand?: boolean;
}>;

export const IpponHSpaceSlot = (props: IpponHSpaceSlotProps): ReactNode => (
  <div
    className={clsx('ippon-h-space--slot', { '-expand': props.expand })}
    data-selector={props.dataSelector}
  >
    {props.children}
  </div>
);
