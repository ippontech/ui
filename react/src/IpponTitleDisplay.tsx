import type { IpponTokenTextColor } from './Tokens.ts';
import type { DataSelectableWithChildren } from './DataSelectable.ts';
import { clsx } from 'clsx';
import { optionalToAlternativeClass, optionalToPrefixedAlternativeClass } from './CAP.ts';
import type { JSX } from 'react';

type Size = 'large' | 'medium' | 'small';

type HeadingTag = 'h1' | 'h2' | 'h3';

type IpponTitleDisplayWithHeadingProps = DataSelectableWithChildren<{
  tag: HeadingTag;
  size?: Size;
  color?: IpponTokenTextColor;
}>;

type IpponTitleDisplayWithNonHeadingProps = DataSelectableWithChildren<{
  tag?: Exclude<keyof JSX.IntrinsicElements, HeadingTag>;
  size: Size;
  color?: IpponTokenTextColor;
}>;

type IpponTitleDisplayProps =
  | IpponTitleDisplayWithHeadingProps
  | IpponTitleDisplayWithNonHeadingProps;

export const IpponTitleDisplay = (props: IpponTitleDisplayProps) => {
  const CustomTag: keyof JSX.IntrinsicElements = (props.tag ||
    'div') as keyof JSX.IntrinsicElements;

  return (
    <CustomTag
      className={clsx(
        'ippon-title-display',
        optionalToAlternativeClass(props.size),
        optionalToPrefixedAlternativeClass('color')(props.color),
      )}
      data-selector={props.dataSelector}
    >
      {props.children}
    </CustomTag>
  );
};
