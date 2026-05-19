import type { JSX, ReactNode } from 'react';
import type { IpponTokenSize } from './Tokens.ts';
import { clsx } from 'clsx';
import type { DataSelectableWithChildren } from './DataSelectable.ts';
import { optionalToAlternativeClass, optionalToPrefixedAlternativeClass } from './CAP.ts';

type Align = 'left' | 'center' | 'justify' | 'right';

type IpponVSpaceProps = DataSelectableWithChildren<{
  gap?: IpponTokenSize;
  align?: Align;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}>;

export const IpponVSpace = (props: IpponVSpaceProps): ReactNode => {
  const CustomTag: keyof JSX.IntrinsicElements = props.tag || 'div';
  const className = clsx(
    'ippon-v-space',
    optionalToPrefixedAlternativeClass('gap')(props.gap),
    optionalToAlternativeClass(props.align),
    props.className,
  );

  return (
    <CustomTag className={className} data-selector={props.dataSelector}>
      {props.children}
    </CustomTag>
  );
};

type IpponVSpaceSlotProps = DataSelectableWithChildren<{
  align?: Align;
}>;

export const IpponVSpaceSlot = (props: IpponVSpaceSlotProps): ReactNode => (
  <div
    className={clsx('ippon-v-space--slot', optionalToAlternativeClass(props.align))}
    data-selector={props.dataSelector}
  >
    {props.children}
  </div>
);
